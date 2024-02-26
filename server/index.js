require('dotenv').config();
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.post("/create", (req, res) => {
  const { id, name, department, dob, gender, designation, salary } = req.body;

  if (!id || !name || !department || !dob || !gender || !designation || !salary) {
    return res.status(400).send("Missing required fields");
  }

  db.query(
    "INSERT INTO employees (id, name, department, dob, gender, designation, salary) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [id, name, department, dob, gender, designation, salary],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).send("Error inserting data");
      }
      console.log("Employee inserted:", result);
      res.status(200).send("Values Inserted");
    }
  );
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});
