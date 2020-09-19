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
    resp.status(200).send({ mennsage: queryResponse });
  } catch (error) {
    console.log(error);
    resp.status(500).send({ message: error });
  }
});

function authorizeUser(req, resp, next) {
  next();
}

app.listen(PORT, () => console.log(`server is runing on port ${PORT}`));
