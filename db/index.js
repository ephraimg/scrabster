
const fakeDB = {
    123456: { id: 123456, name: 'Ephraim' },
    234567: { id: 234567, name: 'Tyler' }
};

const getUserById = function(googleId) {
    return fakeDB[googleId] 
        ? Promise.resolve(fakeDB[googleId])
        : Promise.resolve(null);
}

const saveUser = function(googleProfile) {
    fakeDB[googleProfile.id] = googleProfile;
    return Promise.resolve(googleProfile);
};

module.exports = {
    getUserById,
    saveUser
}

/*

gameToJSON = {
    player1: game.player1,
    player2: game.player2,
    currentPlayer: game.currentPlayer,
    bag: game.bag,
    boardSquares: game.board.squares,
    playHistory: game.playHistory.map(play => ({
        playNumber: play.playNumber,
        playerName: play.player.name,
        placements: play.placements
    }))
}

gameFromJSON = json => {
    const jsonGame = JSON.parse(json);
    const board = new Board();
    board.squares = jsonGame.boardSquares;
    const playHistory = jsonGame.playHistory.map(play => ({
        playNumber: play.playNumber,

    })) 
}


game.board.squares // but play uses board methods!

game.player1

game.player2

game.currentPlayer

game.bag

game.playHistory // array contains plays

*/