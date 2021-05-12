const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const books = data.books;
const reviews = data.reviews;

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();
  await db.serverConfig.close();
};

main().catch(console.log);