// config.js

const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let database;

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    database = client.db('test');
    return database;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}

module.exports = { connectToMongoDB, database };
