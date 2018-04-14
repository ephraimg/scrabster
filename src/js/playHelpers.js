
const getWordOrientation = function(placements) {
    // get all unique rows and columns of the placements
    const rows = new Set(placements.map(p => p.row));
    const cols = new Set(placements.map(p => p.col));
    if (rows.size > 1) { return 'vertical'; }
    if (cols.size > 1) { return 'horizontal'; }
    if (cols.size === 1 && rows.size === 1) { return 'single'; }
};

const getAllInRow = function(square, board) {
    const squares = [square];
    let row = square.row;
    let col = square.col;
    while (board.getSquare(row, ++col).tile !== null) {
        squares.push(board.getSquare(row, col));
    }
    col = square.col;
    while (board.getSquare(row, --col).tile !== null) {
        squares.push(board.getSquare(row, col));
    }
    return squares;
};

const getAllInCol = function(square, board) {
    const squares = [square];
    let row = square.row;
    let col = square.col;
    while (board.getSquare(++row, col).tile !== null) {
        squares.push(board.getSquare(row, col));
    }
    row = square.row;
    while (board.getSquare(--row, col).tile !== null) {
        squares.push(board.getSquare(row, col));
    }
    return squares;
};

const getMainWord = function(placements, board, orient) {
    if (orient === 'vertical') {
        return getAllInCol(placements[0], board);
    } else if (orient === 'horizontal') {
        return getAllInRow(placements[0], board);
    } else if (orient === 'single') {
        return [placements[0]];
    }
};

const getAdjWords = function(placements, board, orient) {
    const words = [];
    if (orient === 'vertical' || orient === 'single') {
        placements.forEach(p => {
            words.push(getAllInRow(p, board));
        })
    } else if (orient === 'horizontal' || orient === 'single') {
        placements.forEach(p => {
            words.push(getAllInCol(p, board));
        })        
    }
    return words.filter(w => w.length > 1);
};

const getAllWords = function(play) {
    const orient = getWordOrientation(play.placements);
    const mainWord = getMainWord(play.placements, play.board, orient);
    const adjWords = getAdjWords(play.placements, play.board, orient);
    return [mainWord, ...adjWords];
};

