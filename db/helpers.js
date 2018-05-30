
const { connectToMongo } = require('./index.js');

let db;

connectToMongo((err, connection) => {
  if (err) {
    console.log(`Error connecting to MongoDB: ${err}`);
  } else {
    db = connection;
  }
});

const getUsers = (googleId, callback) => {
  let options = {};
  if (googleId !== undefined) { options.id = googleId; }  
  db.collection('users').find(options)
    .toArray((err, result) => {
      callback(err, result);
    });
};

const saveUser = (user, callback) => {
  // Note: Without {$set: {}}, whole document gets overwritten
  db.collection('users').update({id: user.id}, {$set: user}, {upsert: true},
    (err, result) => callback(err, user)
  );
};

const saveNonUser = (nonUser, callback) => {
  db.collection('nonusers').save(nonUser,
    (err, result) => callback(err, nonUser)
  );
};

const checkWhitelist = (googleId, callback) => {
  db.collection('whitelist').findOne({id: googleId},
    (err, result) => callback(err, result));
};

const getGames = (gameId, callback) => {
  let options = {};
  if (gameId !== undefined) { options.id = gameId; }
  db.collection('games').find(options)
    .toArray((err, result) => callback(err, result));
};

const saveGame = (game, callback) => {
  db.collection('games').update({id: game.id}, game, {upsert: true},
    (err, result) => callback(err, result)
  );
};

module.exports = { getGames, saveGame, getUsers, saveUser, saveNonUser, checkWhitelist };
