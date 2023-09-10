import { handleError } from "vue";

const medium = [
    [ , ,4,6,2,8,1, , ],
    [ , , ,9, ,1, , , ],
    [9, , ,7, ,5, , ,4],
    [3,9,5, , , ,2,1,8],
    [6, , , , , , , ,3],
    [2,4,8, , , ,6,9,7],
    [5, , ,3, ,9, , , ],
    [ , , ,2, ,4, , , ],
    [ , ,2,5,1,7,9, , ],
];

const easy = [
    [ , ,1,4,5, , , ,9],
    [7, , , ,6,3, ,1, ],
    [ , ,9, ,8, , ,5, ],
    [8, , ,1, , ,5,7, ],
    [ , ,2, ,4, ,9, , ],
    [ ,3,7, , ,6, , ,4],
    [ ,8, , ,7, ,2, , ],
    [ ,2, ,6,1, , , ,3],
    [4, , , ,2,9,8, , ]
];

const hard = [
    [5, , ,4, , , , , ],
    [ ,1, , ,8, ,3, , ],
    [ ,8, , , ,2, , , ],
    [ , , ,6, , ,7, ,5],
    [2, ,7, ,4, ,8, ,3],
    [8, ,4, , ,5, , , ],
    [ , , ,3, , , ,9, ],
    [ , ,3, ,6, , ,2, ],
    [ , , , , ,7, , ,1]
];

const empty = [
    [ , , , , , , , , ],
    [ , , , , , , , , ],
    [ , , , , , , , , ],
    [ , , , , , , , , ],
    [ , , , , , , , , ],
    [ , , , , , , , , ],
    [ , , , , , , , , ],
    [ , , , , , , , , ],
    [ , , , , , , , , ]
];

function clone(sudoku) {
    const cloned = [];
    for (let r = 0; r <= 8; r++) {
        const row = [];
        for (let c = 0; c <= 8; c++) {
            row.push(sudoku[r][c] || 0);
        }
        cloned.push(row);
    }
    return cloned;
}

function createEmpty() {
    const sudoku = [];
    for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
            row.push(0);
        }
        sudoku.push(row);
    }
    return sudoku;
}

function check(sudoku, cell) {
    const value = cell.value;
    if (value === 0) return { passed: true };

    const rowIndex = cell.index[0];
    const colIndex = cell.index[1];
    const squareIndex = Math.trunc(rowIndex / 3) * 3 + Math.trunc(colIndex / 3);

    const row = sudoku[rowIndex];
    if (hasValue({arr: row, index: colIndex, value: value})) {
        return {
            passed: false,
            reason: 'row'
        }
    }
    const column = sudoku.map(current => current[colIndex]);
    if (hasValue({arr: column, index: rowIndex, value: value})) {
        return {
            passed: false,
            reason: 'column'
        }
    }
    const square = getSquare(squareIndex, sudoku);
    const cellInSquareIndex = (rowIndex % 3) * 3 + (colIndex % 3);
    if (hasValue({arr: square, index: cellInSquareIndex, value: value})) {
        return {
            passed: false,
            reason: 'square'
        }
    }

    return { passed: true };
}

function hasValue({arr, index, value}) {
    return (arr.includes(value) && arr.indexOf(value) != index);
}

function getSquare(sqrIndex, sudoku) {
    let square = [];
    let rowStart = Math.trunc(sqrIndex / 3) * 3;
    let colStart = (sqrIndex % 3) * 3;
    for (let row = rowStart; row < rowStart + 3; row++) {
        for (let col = colStart; col < colStart + 3; col++) {
            square.push(sudoku[row][col]);
        }
    }
    return square;
}

export default {
    medium: clone(medium),
    easy: clone (easy),
    hard: clone (hard),
    empty: createEmpty(),
    createEmpty,
    clone,
    check
}