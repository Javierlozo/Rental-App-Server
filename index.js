require("dotenv").config();
const express = require("express");
const sql = require("mysql2/promise");
const cors = require("cors");
const { response } = require("express");

const PORT = 4000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = sql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// POST USER
app.post("/user", authorizeUser, async (req, resp) => {
  try {
    if (!req.body.username) {
      resp.status(400).send({ message: "no username entered" });
    }
    const conn = await pool.getConnection();
    const queryResponse = await conn.execute(
      "INSERT INTO rentalapp.user (username, firstName, lastName) VALUES (?,?,?)",
      [
        req.body.username,
        req.body.firstName ? req.body.firstName : null,
        req.body.lastName ? req.body.lastName : null,
      ]
    );
    conn.release();
    resp.status(200).send({ message: queryResponse });
  } catch (error) {
    console.log(error);
    resp.status(500).send({ message: error });
  }
});

// GET USERS
app.get("/users", authorizeUser, async (req, resp) => {
  try {
    const conn = await pool.getConnection();
    const recordset = await conn.query("SELECT * FROM rentalapp.user");
    conn.release();
    console.log(recordset[0]);
    resp.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    resp.status(500).send({ message: error });
  }
});

// GET ONE USER
app.get("/user", authorizeUser, async (req, resp) => {
  try {
    const conn = await pool.getConnection();
    const recordset = await conn.execute(
      "SELECT * FROM rentalapp.user WHERE username = ?",
      [req.query.username]
    );
    conn.release();
    console.log(recordset[0]);
    resp.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    resp.status(500).send({ message: error });
  }
});

// MODIFY USER
app.put("/user", authorizeUser, async (req, resp) => {
  try {
    if (!req.body.username) {
      resp.status(400).send({ message: "no username entered" });
    }

    const selectQuery = await pool.execute(
      "SELECT * FROM rentalapp.user WHERE username = ?",
      [req.body.username]
    );

    const selectedUser = selectQuery[0][0];

    const conn = await pool.getConnection();
    const queryResponse = await conn.execute(
      "UPDATE rentalapp.user SET username = ?, firstName = ?, lastName = ? WHERE username = ?",
      [
        req.body.username,
        req.body.firstName ? req.body.firstName : selectedUser.firstName,
        req.body.lastName ? req.body.lastName : selectedUser.lastName,
        req.body.username,
      ]
    );
    conn.release();
    resp.status(200).send({ message: queryResponse });
  } catch (error) {
    console.log(error);
    resp.status(500).send({ message: error });
  }
});

// DELETE USER
app.delete("/user", authorizeUser, async (req, resp) => {
  try {
    const conn = await pool.getConnection();
    const recordset = await conn.execute(
      "DELETE FROM rentalapp.user WHERE username = ?",
      [req.body.username]
    );
    conn.release();
    console.log(recordset[0]);
    resp.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    resp.status(500).send({ message: error });
  }
});

function authorizeUser(req, resp, next) {
  next();
}

app.listen(PORT, () => console.log(`server is runing on port ${PORT}`));
