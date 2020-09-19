require("dotenv").config();
const sql = require("mysql2/promise");

const pool = sql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// (async function testConnection() {
//   try {
//     const conn = await pool.getConnection();
//     console.log("connection created", conn);
//     conn.release();
//   } catch (error) {
//     console.log(error);
//   }
// })();

// (async function createUserTable() {
//   try {
//     const conn = await pool.getConnection();

//     conn.query("CREATE DATABASE IF NOT EXISTS rentalapp");
//     conn.query("USE rentalapp");

//     const userDb = await conn.query(
//       "CREATE TABLE IF NOT EXISTS user (username VARCHAR(255) UNIQUE NOT NULL, firstName VARCHAR(255), lastName VARCHAR(255), PRIMARY KEY(username) )"
//     );
//     console.log(userDb);

//     conn.release();
//   } catch (error) {
//     console.log(error);
//   }
// })();

// (async function createCardSurfboardsTable() {
//   try {
//     const conn = await pool.getConnection();

//     conn.query("USE rentalapp");

//     const cardSurfboardsDb = await conn.query(
//       "CREATE TABLE IF NOT EXISTS cardSurfboards (id INT UNIQUE NOT NULL AUTO_INCREMENT, title VARCHAR(255), description VARCHAR(255), rentcost VARCHAR(255), username VARCHAR(255) NOT NULL, date DATETIME NOT NULL, PRIMARY KEY(id), FOREIGN KEY(username) REFERENCES user(username))"
//     );
//     console.log(cardSurfboardsDb);

//     conn.release();
//   } catch (error) {
//     console.log(error);
//   }
// })();

// (async function createCardKayaksTable() {
//   try {
//     const conn = await pool.getConnection();

//     conn.query("USE rentalapp");

//     const cardKayakDb = await conn.query(
//       "CREATE TABLE IF NOT EXISTS cardKayaks (id INT UNIQUE NOT NULL AUTO_INCREMENT, title VARCHAR(255), description VARCHAR(255), rentcost VARCHAR(255), username VARCHAR(255) NOT NULL, date DATETIME NOT NULL, PRIMARY KEY(id), FOREIGN KEY(username) REFERENCES user(username))"
//     );
//     console.log(cardKayakDb);
//   } catch (error) {
//     console.log(error);
//   }
// })();

// (async function createCardBikesTable() {
//   try {
//     const conn = await pool.getConnection();

//     conn.query("USE rentalapp");

//     const cardBikesDb = await conn.query(
//       "CREATE TABLE IF NOT EXISTS cardBikes (id INT UNIQUE NOT NULL AUTO_INCREMENT, title VARCHAR(255), description VARCHAR(255), rentcost VARCHAR(255), username VARCHAR(255) NOT NULL, date DATETIME NOT NULL, PRIMARY KEY(id), FOREIGN KEY(username) REFERENCES user(username))"
//     );
//     console.log(cardBikesDb);
//   } catch (error) {
//     console.log(error);
//   }
// })();

// (async function createCardsTable() {
//   try {
//     const conn = await pool.getConnection();

//     conn.query("USE rentalapp");

//     const cardsDb = await conn.query(
//       "CREATE TABLE IF NOT EXISTS cards (id INT UNIQUE NOT NULL AUTO_INCREMENT, title VARCHAR(255), description VARCHAR(255), rentcost VARCHAR(255), username VARCHAR(255) NOT NULL, date DATETIME NOT NULL, PRIMARY KEY(id), FOREIGN KEY(username) REFERENCES user(username))"
//     );
//     console.log(cardsDb);
//   } catch (error) {
//     console.log(error);
//   }
// })();

// (async function createPicsTable() {
//   try {
//     const conn = await pool.getConnection();

//     conn.query("USE rentalapp");

//     const cardPicsDb = await conn.query(
//       "CREATE TABLE IF NOT EXISTS cardpics (s3uuid VARCHAR(255) NOT NULL UNIQUE, description VARCHAR(255), cards INT NOT NULL, PRIMARY KEY(s3uuid), FOREIGN KEY(cards) REFERENCES cards(id))"
//     );
//     console.log(cardPicsDb);
//   } catch (error) {
//     console.log(error);
//   }
// })();
