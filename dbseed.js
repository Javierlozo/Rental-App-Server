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

// USER TABLE
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

// SURFBOARD TABLE (NOT USED)
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

// KAYAK TABLE (NOT USED)
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

// BIKES TABLE (NOT USED)
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

// CARDS TABLE
// (async function createCardsTable() {
//   try {
//     const conn = await pool.getConnection();

//     conn.query("USE rentalapp");

//     const cardsDb = await conn.query(
//       "CREATE TABLE IF NOT EXISTS cards (id INT UNIQUE NOT NULL AUTO_INCREMENT, title VARCHAR(255) NOT NULL, description VARCHAR(255), rentcost VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, s3uuid VARCHAR(255) NOT NULL UNIQUE, date DATETIME NOT NULL, PRIMARY KEY(id), FOREIGN KEY(username) REFERENCES user(username))"
//     );
//     console.log(cardsDb);
//   } catch (error) {
//     console.log(error);
//   }
// })();

// PICS TABLE (NOT USED)
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

// MESSAGE TABLE
// (async function createMessageTable() {
//   try {
//     const conn = await pool.getConnection();

//     conn.query("USE rentalapp");

//     const messageDb = await conn.query(
//       "CREATE TABLE IF NOT EXISTS message (id INT UNIQUE NOT NULL AUTO_INCREMENT, username VARCHAR(255), tousername VARCHAR(255) NOT NULL, date VARCHAR(255), msgsubject VARCHAR(255) NOT NULL, msgbody VARCHAR(4000) NOT NULL, PRIMARY KEY(id), FOREIGN KEY(username) REFERENCES user(username))"
//     );
//     console.log(messageDb);
//     conn.release();
//   } catch (error) {
//     console.log(error);
//   }
// })();
