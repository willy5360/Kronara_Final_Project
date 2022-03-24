const input = [
    "4 4",
    "2 5 4 0",
    "2 1 4 2",
    "0 1 1 0",
    "4 4 0 3",
    "0 0 4 3",
    "0 0 1 1",
    "1 4 0 0",
    "4 4 3 5",
    "5 5 2 4",
    "1 1 0 5",
    "4 1 0 4",
    "1 0 2 4",
    "3 5 1 2",
    "1 4 2 0",
    "0 1 5 2",
    "1 5 0 4",
];

function getPuzzleInfo(arr) {
    //dimensiones y piezas
    let puzzleData = arr[0].split(" ").map((element) => Number(element));
    let info = {
        width: puzzleData[0],
        height: puzzleData[1],
        puzzleSize: puzzleData[0] * puzzleData[1],
        pieces: arr
            .filter((element, index) => (index > 0 ? element : ""))
            .map((value) => value.split(" ").map((item) => Number(item))),
    };
    return info;
}

let puzzleWidth = getPuzzleInfo(input).width;
let puzzleHeight = getPuzzleInfo(input).height;
let puzzlePieces = getPuzzleInfo(input).pieces;

const LEFT_SIDE = 0;
const TOP_SIDE = 1;
const RIGHT_SIDE = 2;
const BOTTOM_SIDE = 3;

// console.log("puzzlePieces", puzzlePieces)

function createEmptyPuzzle(width, heigth) {
    let matrix = [];
    for (let axisY = 0; axisY < width; axisY++) {
        let row = [];
        matrix.push(row);
        for (let axisX = 0; axisX < heigth; axisX++) {
            row[axisX] = undefined;
        }
    }
    return matrix;
}

let blankPuzzleTable = createEmptyPuzzle(puzzleWidth, puzzleHeight);

//>>>>>>>>>>>>>>>>>> Rotating Function <<<<<<<<<<<<<<<<<<<<<
function rotate(arr, counter) {
    arr.unshift(arr.pop());
    return arr;
}
//>>>>>>>>>>>>>>>>>> Rotating Function <<<<<<<<<<<<<<<<<<<<<

let piecesTwisted = [
    [2, 5, 4, 0],
    [2, 1, 4, 2],
    [0, 0, 1, 1],
    [4, 4, 0, 3],
    [4, 3, 0, 0],
    [0, 1, 1, 0],
    [4, 0, 0, 1],
    [4, 3, 5, 4],
    [5, 2, 4, 5],
    [1, 0, 5, 1],
    [4, 1, 0, 4],
    [0, 2, 4, 1],
    [5, 1, 2, 3],
    [1, 4, 2, 0],
    [0, 1, 5, 2],
    [5, 0, 4, 1],
];

function getPieceNumber(pieces, filledTable) {
    for (let row in filledTable) {
        for (let piece in filledTable[row]) {
            for (let index in pieces) {
                if (pieces[index] == filledTable[row][piece]) {
                    filledTable[row][piece] = Number(index) + 1;
                }
            }
        }
    }
    return filledTable;
}

function firstRow(pieces, table, row, value, size) {
    //>>>>>>>>>>>>>>>>>> first Value <<<<<<<<<<<<<<<<<<<<<
    for (let selectedPiece of pieces) {
        // We need to alocate the first piece
        if (selectedPiece[LEFT_SIDE] == 0 && selectedPiece[TOP_SIDE] == 0) {
            table[row][value] = selectedPiece;
        }
    }

    //>>>>>>>>>>>>>>>>>> Mid Values <<<<<<<<<<<<<<<<<<<<<
    let middleValues = size - 2;

    value += middleValues;

    if (middleValues != 0) {
        for (let rowValue = 0; rowValue < middleValues; rowValue++) {
            for (let selectedPiece of pieces) {
                if (
                    selectedPiece[LEFT_SIDE] ==
                        table[row][rowValue][RIGHT_SIDE] &&
                    selectedPiece[TOP_SIDE] == 0
                ) {
                    table[row][rowValue + 1] = selectedPiece;
                }
            }
        }
    }

    //>>>>>>>>>>>>>>>>>> Last Value <<<<<<<<<<<<<<<<<<<<<

    for (let selectedPiece of pieces) {
        if (
            selectedPiece[LEFT_SIDE] == table[row][value][RIGHT_SIDE] &&
            selectedPiece[TOP_SIDE] == 0 &&
            selectedPiece[RIGHT_SIDE] == 0
        ) {
            table[row][value + 1] = selectedPiece;
        }
    }
    return table;
}

function middleRows(pieces, table, row, value, size) {
    //>>>>>>>>>>>>>>>>>> First Value <<<<<<<<<<<<<<<<<<<<<
    for (let selectedPiece of pieces) {
        if (
            selectedPiece[LEFT_SIDE] == 0 &&
            selectedPiece[TOP_SIDE] == table[row][value][BOTTOM_SIDE]
        ) {
            table[row + 1][value] = selectedPiece;
        }
    }

    //>>>>>>>>>>>>>>>>>> Mid Values <<<<<<<<<<<<<<<<<<<<<
    let middleValues = size - 2;

    if (middleValues != 0) {
        for (let rowValue = 0; rowValue < middleValues; rowValue++) {
            for (let selectedPiece of pieces) {
                if (
                    selectedPiece[LEFT_SIDE] ==
                        table[row + 1][rowValue][RIGHT_SIDE] &&
                    selectedPiece[TOP_SIDE] ==
                        table[row][rowValue + 1][BOTTOM_SIDE]
                ) {
                    table[row + 1][rowValue + 1] = selectedPiece;
                }
            }
        }
    }

    //>>>>>>>>>>>>>>>>>> Last Value <<<<<<<<<<<<<<<<<<<<<
    value += middleValues;

    for (let selectedPiece of pieces) {
        if (
            selectedPiece[LEFT_SIDE] == table[row + 1][value][RIGHT_SIDE] &&
            selectedPiece[TOP_SIDE] == table[row][value + 1][BOTTOM_SIDE] &&
            selectedPiece[RIGHT_SIDE] == 0
        ) {
            table[row + 1][value + 1] = selectedPiece;
        }
    }
    return table;
}

function finalRow(pieces, table, row, value, size) {
    //>>>>>>>>>>>>>>>>>> First Value <<<<<<<<<<<<<<<<<<<<<

    for (let selectedPiece of pieces) {
        if (
            selectedPiece[LEFT_SIDE] == 0 &&
            selectedPiece[TOP_SIDE] == table[row - 1][value][BOTTOM_SIDE] &&
            selectedPiece[BOTTOM_SIDE] == 0
        ) {
            table[row][value] = selectedPiece;
        }
    }
    //>>>>>>>>>>>>>>>>>> Mid Values <<<<<<<<<<<<<<<<<<<<<
    let middleValues = size - 2;

    if (middleValues != 0) {
        for (let rowValue = 0; rowValue < middleValues; rowValue++) {
            for (let selectedPiece of pieces) {
                if (
                    selectedPiece[LEFT_SIDE] ==
                        table[row][rowValue][RIGHT_SIDE] &&
                    selectedPiece[TOP_SIDE] ==
                        table[row - 1][rowValue + 1][BOTTOM_SIDE] &&
                    selectedPiece[BOTTOM_SIDE] == 0
                ) {
                    table[row][rowValue + 1] = selectedPiece;
                }
            }
        }
    }
    //>>>>>>>>>>>>>>>>>> Last Value <<<<<<<<<<<<<<<<<<<<<
    value += middleValues;

    for (let selectedPiece of pieces) {
        if (
            selectedPiece[LEFT_SIDE] == table[row][value][RIGHT_SIDE] &&
            selectedPiece[TOP_SIDE] == table[row - 1][value + 1][BOTTOM_SIDE] &&
            selectedPiece[RIGHT_SIDE] == 0 &&
            selectedPiece[BOTTOM_SIDE] == 0
        ) {
            table[row][value + 1] = selectedPiece;
        }
    }

    return table;
}

function addingPiecesToEmptyTable(pieces, puzzleTable) {
    let row = 0;
    let value = 0;

    //>>>>>>>>>>>>>>> First Row <<<<<<<<<<<<<<<<<<<<<<

    firstRow(pieces, puzzleTable, row, value, puzzleWidth);

    // >>>>>>>>>>>>>>> Mid Rows <<<<<<<<<<<<<<<<<<<<<<

    let midRows = puzzleHeight - 2;

    if (midRows != 0) {
        for (let rows = 0; rows < midRows; rows++) {
            middleRows(pieces, puzzleTable, rows, value, puzzleWidth);
        }
    }

    //>>>>>>>>>>>>>>> Final Row <<<<<<<<<<<<<<<<<<<<<<

    let lastRow = puzzleHeight - 1; //3

    finalRow(pieces, puzzleTable, lastRow, value, puzzleWidth);

    // >>>>>> Swithing Pieces array for Index <<<<<<<

    getPieceNumber(pieces, puzzleTable);

    return puzzleTable;
}

console.log(addingPiecesToEmptyTable(piecesTwisted, blankPuzzleTable));
