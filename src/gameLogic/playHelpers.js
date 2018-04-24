
export const crossesCenter = function(play) {
    return play.placements.includes(play.board.getSquare(7, 7));
}

const isRowAligned = function(play) {
    const playSquares = play.squares;
    for (let i = 1; i < playSquares.length; i++) {
        if (playSquares[i].row !== playSquares[i - 1].row) { return false; }
    }
    return true;    
}

const isColAligned = function(play) {
    const playSquares = play.squares;
    for (let i = 1; i < playSquares.length; i++) {
        if (playSquares[i].col !== playSquares[i - 1].col) { return false; }
    }
    return true;    
}

export const formsLine = function(play) {
    return isRowAligned(play) || isColAligned(play);
}

export const isContiguous = function(play) {
    const sqs = play.squares;
    if (sqs.length === 1) { return true; }
    if (isRowAligned(play)) {
        const row = sqs[0].row;
        for (let col = sqs[0].col; col < sqs[sqs.length - 1].col; col++) {
            if (!play.board.getSquare(row, col).tile) { return false; }
        }
    } else if (isColAligned(play)) {
        const col = sqs[0].col;
        for (let row = sqs[0].row; row < sqs[sqs.length - 1].row; row++) {
            if (!play.board.getSquare(row, col).tile) { return false; }
        }
    }
    return true; 
}

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
    while (board.getSquare(row, ++col) && board.getSquare(row, col).tile) {
        squares.push(board.getSquare(row, col));
    }
    col = square.col;
    while (board.getSquare(row, --col) && board.getSquare(row, col).tile) {
        squares.unshift(board.getSquare(row, col));
    }
    return squares;
};

const getAllInCol = function(square, board) {
    const squares = [square];
    let row = square.row;
    let col = square.col;
    while (board.getSquare(++row, col) && board.getSquare(row, col).tile) {
        squares.push(board.getSquare(row, col));
    }
    row = square.row;
    while (board.getSquare(--row, col) && board.getSquare(row, col).tile) {
        squares.unshift(board.getSquare(row, col));
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
        });
    }
    if (orient === 'horizontal' || orient === 'single') {
        placements.forEach(p => {
            words.push(getAllInCol(p, board));
        });   
    }
    // console.log('Raw words: ', words);
    return words.filter(w => w.length > 1);
};

export const isConnected = function(play) {
    const orient = getWordOrientation(play.placements);
    const adjWords = getAdjWords(play.placements, play.board, orient);
    if (adjWords.length > 0) { return true; }
    if (orient === 'vertical') {
        let sqs = play.squares;
        let lastSq = sqs[sqs.length - 1];
        if (sqs[0].row > 0 && play.board.getSquare(sqs[0].row - 1, sqs[0].col).tile) {
            return true;
        }
        if (lastSq.row < 14 && play.board.getSquare(lastSq.row + 1, lastSq.col).tile) {
            return true;
        }
        for (let row = sqs[0].row; row < lastSq.row; row++) {
            const sq = play.board.getSquare(row, lastSq.col);
            if (sq.tile && !play.placements.includes(sq)) {
                return true;
            }
        }
    } else if (orient === 'horizontal') {
        let sqs = play.squares;
        let lastSq = sqs[sqs.length - 1];
        if (sqs[0].col > 0 && play.board.getSquare(sqs[0].row, sqs[0].col - 1).tile) {
            return true;
        }
        if (lastSq.col < 14 && play.board.getSquare(lastSq.row, lastSq.col + 1).tile) {
            return true;
        }
        for (let col = sqs[0].col; col < lastSq.col; col++) {
            const sq = play.board.getSquare(lastSq.row, col);
            if (sq.tile && !play.placements.includes(sq)) {
                return true;
            }
        }
    } else if (orient === 'single') {
        let sq = play.placements[0];
        if (sq.row > 0 && play.board.getSquare(sq.row - 1, sq.col).tile) { return true; }
        if (sq.row < 14 && play.board.getSquare(sq.row + 1, sq.col).tile) { return true; }
        if (sq.col > 0 && play.board.getSquare(sq.row, sq.col - 1).tile) { return true; }
        if (sq.col < 14 && play.board.getSquare(sq.row, sq.col + 1).tile) { return true; }
    }
    return false;
}

export const getAllWords = function(play) {
    const orient = getWordOrientation(play.placements);
    const mainWord = getMainWord(play.placements, play.board, orient);
    // console.log('Main word: ', '"' + mainWord.map(sq => sq.tile.letter).join('') + '"');
    const adjWords = getAdjWords(play.placements, play.board, orient);
    return mainWord.length < 2 && play.playNumber > 0 ? adjWords : [mainWord, ...adjWords];
};

