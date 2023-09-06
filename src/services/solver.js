import sudokuService from './sudokuService';

class SudokuField {
    /**
     * Creates a single field of a sudoku.
     * @param {number} row The y position of the field
     * @param {number} column The x position of the field
     * @param {number} value The value of the field: 1-9 or undefined
     */
    constructor(row, column, value) {
        this.row = row;
        this.col = column;
        this.sqr = Math.trunc(row / 3) * 3 + Math.trunc(column / 3); // Indicates, which 3x3 square this field belongs to. Counted from left to right, then top to bottom.
        this.value = value;
        this.possibleValues = value ? [ value ] : [1,2,3,4,5,6,7,8,9]; // Keeps track of the values that are POSSIBLE for this field. Set to [value] if field is solved.
    }
}

class SudokuSolver {
    /**
     * Creates a sudoku solver object.
     * @param {number[][] || null} sudoku The sudoku to solve as a 9x9 two-dimensional Array of integers from 1 to 9, or empty /'undefined' for unsolved fields.
     */
    constructor(sudoku) {
        this.solvedFields = 0;
        this.removedPossibleValues = 0; // Keeps track of removed 'possibleValues' during solving.
        this.rounds = 0;
        this.solvable = true;
        // creates a new sudoku from the input array. Instead of numbers, each field contains a new SudokuField object:
        this.sudoku = [];
        for (let r = 0; r < 9; r++) { 
            this.sudoku.push([]);
            for (let c = 0; c < 9; c++) {
                if (sudoku) this.sudoku[r].push(new SudokuField(r, c, sudoku[r][c]));
                else this.sudoku[r].push(new SudokuField(r, c, undefined));
                if (this.sudoku[r][c].value) this.solvedFields++;
            }
        }
    }
    
    /**
     * Extracts a column of a sudoku.
     * @param {number} colNumber 
     * @returns {number[]} the column
     */
    getColumn(colNumber) {
        return this.sudoku.map(current => current[colNumber]);
    }

    /**
     * Extracts the elements of a 3x3 square of a sudoku.
     * @param {number} sqrNumber the square number from left to right, top to bottom 
     * @returns {number[]} the elements of the 3x3 square
     */
    getSquare(sqrNumber) {
        let square = [];
        let rowStart = Math.trunc(sqrNumber / 3) * 3;
        let colStart = (sqrNumber % 3) * 3;
        for (let row = rowStart; row < rowStart + 3; row++) {
            for (let col = colStart; col < colStart + 3; col++) {
                square.push(this.sudoku[row][col]);
            }
        }
        return square;
    }

    /**
     * Sets a field to a specific value.
     * Sets 'possibleValues' to [value], or to all if 'value' is undefined.
     * Keeps track of 'removedPossibleValues' and 'solvedFields'.
     * @param {Field} field the Field object
     * @param {number} value the value
     */
    setField(field, value) {
        const oldValue = field.value;
        const oldPossibleValues = field.possibleValues;
        field.value = value;
        field.possibleValues = value ? [ value ] : [1,2,3,4,5,6,7,8,9];
        this.removedPossibleValues += (oldPossibleValues.length - field.possibleValues.length);
        if (oldValue && !value) this.solvedFields--;
        if (!oldValue && value) this.solvedFields++;
    }

    /**
     * Checks the 'possibleValues' of a field against its row, column, and square for duplicates,
     * and updates its 'possibleValues' property.
     * Keeps also track of the 'removedPossibleValues'.
     * @param {Field} field the Field object 
     * @returns the updated possibleValues property array.
     */
    updatePossibleValues(field) {
        const row = this.sudoku[field.row].map((current) => current.value);
        const col = this.getColumn(field.col).map((current) => current.value);
        const sqr = this.getSquare(field.sqr).map((current) => current.value);
        let newPossibleValues = field.possibleValues.filter(val => !(row.includes(val) || col.includes(val) || sqr.includes(val) ));
        this.removedPossibleValues += (field.possibleValues.length - newPossibleValues.length);
        field.possibleValues = newPossibleValues;
        return newPossibleValues;
    }

    /**
     * Sets a field if there is only one possible value for it.
     * Sets 'solvable' to false if there is no possible value.
     * @param {Field} field the Field object 
     */
    solveField(field) {
        let possible = this.updatePossibleValues(field);
        if (possible.length === 0) this.solvable = false;
        else if (possible.length === 1) this.setField(field, possible[0]);
    }

    /**
     * Tries to solve a 9-element-block of fields: A row, column, or 3x3 square.
     * Checks, which numbers are missing in this block, and where they are possible.
     * If there is only one possible position for a number, this field will be set to this number.
     * @param {number[]} block - A 9-element row, column, or 3x3 square
     */
    solveBlock(block) {
        for (let num = 1; num <= 9; num++) {
            if (block.map(current => current.value).includes(num)) continue;
            
            let found = [];                                              
            for (let position = 0; position < 9; position++) {
                if (block[position].possibleValues.includes(num)) {
                    found.push({
                        field: block[position],
                        number: num 
                    });
                }
            }
            if (found.length ===1 ) this.setField(found[0].field, found[0].number);
        }
    }

    /**
     * A round of solving.
     * 1. Tries to solve every single empty field with 'solveField()'
     * 2. Tries to solve every row, column, and 3x3 field with 'solveBlock()'
     * @returns {boolean} if there has been any progess or not.
     */
    round() {
        this.rounds++;
        let removedBefore = this.removedPossibleValues;
        let solvedBefore = this.solvedFields;

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const field = this.sudoku[r][c];
                if (!field.value) this.solveField(field);
                if (!this.solvable) return false;
            }
        }

        for (let b = 0; b < 9; b++) {
            this.solveBlock(this.sudoku[b]);
            this.solveBlock(this.getColumn(b));
            this.solveBlock(this.getSquare(b));
        }

        let removedThisRound = this.removedPossibleValues - removedBefore;
        let solvedThisRound = this.solvedFields - solvedBefore;
        return (removedThisRound + solvedThisRound > 0); 
    }

    /**
     * Solves the sudoku:
     * Starts solving rounds as long as there is progress.
     * If no more progress is possible, it starts guessing numbers.
     * @param {boolean} visible - Should the result be printed out? 
     * @returns {boolean} if the Sudoku has been solved or not.
     */
    solve(visible = true) {
        let solved = false;
        
        while(this.round()) {
            solved = this.solvedFields === 81;
            if (solved) break;
        }
        if (!this.solvable) return false;
        if (!solved) {
            if (!this.guess()) return false;
            else solved = this.solvedFields === 81;
        }
        if (visible) this.print();
        return solved;
    }

    /**
     * This will be used if the 'solveField()' and 'solveBlock()' methods fail:
     * It sets the value of an empty field to a possible value and tries solve the remaining sudoku.
     * If it fails, it tries another value. Includes recursion.
     * @returns {boolean} if the guessing was succesful or not.
     */
    guess() {
        let emptyField = undefined;
        for (let row of this.sudoku) {
            emptyField = row.find(col => col.value == undefined);
            if (emptyField) break;
        }

        if (!emptyField) {
            console.log('No empty field found!');
            this.print();
            return false;
        }      

        const field = emptyField;
        this.solveField(field);

        const guesser = new SudokuSolver();
        let possible = field.possibleValues;
        for (let p = 0; p < possible.length; p++) {
            guesser.sudoku = sudokuService.clone(this.sudoku);
            guesser.solvedFields = this.solvedFields;
            guesser.removedPossibleValues = this.removedPossibleValues;
            guesser.rounds = this.rounds;
            guesser.solvable = this.solvable;
            
            guesser.setField(guesser.sudoku[field.row][field.col], possible[p]);
            let solved = guesser.solve(false);
            
            if (solved) {
                this.sudoku = sudokuService.clone(guesser.sudoku);
                this.solvedFields = guesser.solvedFields;
                this.removedPossibleValues = guesser.removedPossibleValues;
                this.rounds = guesser.rounds;
                this.solvable = guesser.solvable;
                return true;
            
            } else { 
                this.rounds = guesser.rounds;
                continue;
            }
        }

        this.solvable = false;
        return false;
    }

    /**
     * Logs this.sudoku to the console in a human readable form. 
     */
    print() {
        console.log('+---------+---------+---------+');
        for (let r = 0; r < 9; r++) {
            if (r === 3 || r === 6 ) console.log('+---------+---------+---------+');
            let rowString = '|';
            for (let c = 0; c < 9; c++) {
                if (c === 3 || c === 6 ) rowString += '|';
                let val = this.sudoku[r][c].value;
                rowString = rowString + ' ' + (val || ' ') + ' ';
            }
            console.log(rowString + '|');
        }
        console.log('+---------+---------+---------+');
    }
}

export default SudokuSolver;