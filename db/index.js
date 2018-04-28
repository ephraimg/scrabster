
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const uri = process.env.NODE_ENV === 'development'
  ? process.env.MONGODB_URI_DEV
  : process.env.MONGODB_URI_PROD;

const connectToMongo = (callback) => {
  MongoClient.connect(uri, (err, client) => {
    if (!err) {
      console.log('Connected successfully to MongoDB');
    } else {
      console.log(`MongoClient connect error: ${err}`);
    }
    callback(err, client.db(process.env.DB_NAME));
  });
};

module.exports = { connectToMongo };
