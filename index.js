require("dotenv").config();
const express = require("express");
const sql = require("mysql2/promise");
const cors = require("cors");
const { resp } = require("express");

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
      resp.status(400).send({ message: "No username entered" });
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

// POST CARD
app.post("/card", authorizeUser, async (req, resp) => {
  try {
    if (
      !req.body.username ||
      !req.body.title ||
      !req.body.rentcost ||
      !req.body.s3uuid
    ) {
      resp.status(400).send({ message: "Enter All Required Information" });
    }
    const conn = await pool.getConnection();
    const queryResponse = await conn.execute(
      "INSERT INTO rentalapp.cards (username, title, description, rentcost, s3uuid, date) VALUES (?,?,?,?,?,?)",
      [
        req.body.username,
        req.body.title,
        req.body.description,
        req.body.rentcost,
        req.body.s3uuid,
        new Date(),
      ]
    );
    conn.release();
    console.log(queryResponse);
    resp.status(200).send({ message: queryResponse });
  } catch (error) {
    console.log(error);
    resp.status(500).send({ message: error });
  }
});

// GET ALL CARDS
app.get("/cards", authorizeUser, async (req, resp) => {
  try {
    const conn = await pool.getConnection();
    const recordset = await conn.query("SELECT * FROM rentalapp.cards");
    // const recordset = await conn.query(
    //   "SELECT * FROM rentalapp.user users JOIN rentalapp.cards cards ON users.username = cards.username"
    // );
    conn.release();
    console.log(recordset[0]);
    resp.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    resp.status(500).send({ message: error });
  }
});

// GET ONE CARD
app.get("/card", authorizeUser, async (req, resp) => {
  try {
    const conn = await pool.getConnection();
    const recordset = await conn.execute(
      "SELECT * FROM rentalapp.cards WHERE id = ?",
      [req.query.cardid]
    );
    conn.release();
    console.log(recordset[0]);
    resp.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    resp.status(500).send({ message: error });
  }
});

// MODIFY CARD
app.put("/card", authorizeUser, async (req, resp) => {
  try {
    if (!req.body.cardid) {
      resp.status(400).send({ message: "No valid id entered" });
    }

    const selectQuery = await pool.execute(
      "SELECT * FROM rentalapp.cards WHERE id = ?",
      [req.body.cardid]
    );

    const selectedCard = selectQuery[0][0];

    const conn = await pool.getConnection();
    const queryResponse = await conn.execute(
      "UPDATE rentalapp.cards SET title = ?, description = ?, rentcost = ?, s3uuid = ?, date = ? WHERE id = ?",
      [
        req.body.title ? req.body.title : selectedCard.title,
        req.body.description ? req.body.description : selectedCard.description,
        req.body.rentcost ? req.body.rentcost : selectedCard.rentcost,
        req.body.s3uuid ? req.body.s3uuid : selectedCard.s3uuid,
        new Date(),
        req.body.cardid,
      ]
    );
    conn.release();
    resp.status(200).send({ message: queryResponse });
  } catch (error) {
    console.log(error);
    resp.status(500).send({ message: error });
  }
});

// DELETE CARD
app.delete("/card", authorizeUser, async (req, resp) => {
  try {
    const conn = await pool.getConnection();
    const recordset = await conn.execute(
      "DELETE FROM rentalapp.cards WHERE id = ?",
      [req.body.cardid]
    );
    conn.release();
    console.log(recordset[0]);
    resp.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    resp.status(500).send({ message: error });
  }
});

// POST MESSAGE
app.post("/message", authorizeUser, async (req, resp) => {
  try {
    const conn = await pool.getConnection();
    const queryResponse = await conn.execute(
      "INSERT INTO rentalapp.message (username, tousername, date, msgsubject, msgbody) VALUES ( ?, ?, ?, ?, ?)",
      [
        req.body.username,
        req.body.tousername ? req.body.tousername : null,
        new Date(),
        req.body.msgsubject ? req.body.msgsubject : null,
        req.body.msgbody ? req.body.msgbody : null,
      ]
    );
    conn.release();
    console.log(queryResponse);
    resp.status(200).send({ message: queryResponse });
  } catch (error) {
    console.log(error);
    resp.status(500).send({ message: error });
  }
});

// GET ALL MESSAGES
app.get("/messages", authorizeUser, async (req, resp) => {
  try {
    const conn = await pool.getConnection();
    const recordset = await conn.query("SELECT * FROM rentalapp.message");

    conn.release();
    console.log(recordset[0]);
    resp.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    resp.status(500).send({ message: error });
  }
});

// GET ONE MESSAGE
app.get("/message", authorizeUser, async (req, resp) => {
  try {
    const conn = await pool.getConnection();
    const recordset = await conn.execute(
      "SELECT * FROM rentalapp.message WHERE id = ?",
      [req.query.messageid]
    );
    conn.release();
    console.log(recordset[0]);
    resp.status(200).send({ message: recordset[0] });
  } catch (error) {
    console.log(error);
    resp.status(500).send({ message: error });
  }
});

// MODIFY MESSAGE
app.put("/message", authorizeUser, async (req, resp) => {
  try {
    if (!req.body.messageid) {
      resp.status(400).send({ message: "No valid id entered" });
    }

    const selectQuery = await pool.execute(
      "SELECT * FROM rentalapp.message WHERE id = ?",
      [req.body.messageid]
    );

    const selectedMessage = selectQuery[0][0];

    const conn = await pool.getConnection();
    const queryResponse = await conn.execute(
      "UPDATE rentalapp.message SET username = ?, tousername = ?, date = ? , msgsubject = ?, msgbody = ? WHERE id = ?",
      [
        req.body.username,
        req.body.tousername ? req.body.tousername : selectedMessage.tousername,
        new Date(),
        req.body.msgsubject ? req.body.msgsubject : selectedMessage.msgsubject,
        req.body.msgbody ? req.body.msgbody : selectedMessage.msgbody,
        req.body.messageid,
      ]
    );
    conn.release();
    resp.status(200).send({ message: queryResponse });
  } catch (error) {
    console.log(error);
    resp.status(500).send({ message: error });
  }
});

// DELETE MESSAGE
app.delete("/message", authorizeUser, async (req, resp) => {
  try {
    const conn = await pool.getConnection();
    const recordset = await conn.execute(
      "DELETE FROM rentalapp.message WHERE id = ?",
      [req.body.messageid]
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
