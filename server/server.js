const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");
const xpath = require("xpath");
// const { config } = require('dotenv');
const pool = require("./db");
require("dotenv").config();
const Port = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());

app.get("/api/data", async (req, res) => {
  try {
    const url1 = process.env.url1;
    const url2 = process.env.url2;

    const [response1, response2] = await Promise.all([
      axios.get(url1),
      axios.get(url2),
    ]);

    const data1 = response1.data.objects || [];
    const data2 = response2.data.objects || [];

    const combinedData = [...data1, ...data2];

    // console.log(combinedData);

    res.json(combinedData);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});




app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
 

  const query = "SELECT * FROM users WHERE email = $1 AND password = $2";

  try {
    const response = await pool.query(query, [email, password]);

    if (response.rowCount === 0) {
      res.status(401).json({ message: "Invalid email or password" });
    } else {
      res.status(200).json({ message: "Login successful" });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Failed to login user" });
  }
});





app.post("/api/register", async (req, res) => {
  const { email, username, password } = req.body;
  // console.log(email , password , username);

  const query =
    "INSERT INTO users (email, username, password) VALUES ($1, $2, $3)";

  try {
    const response = await pool.query(query, [email, username, password]);

    if (response.rowCount === 1) {
      res.status(200).json({ message: "User registered successfully" });
    } else {
      res.status(500).json({ message: "Failed to register user" });
    }
  } catch (error) {
    console.error("Error registering user:", error.detail);
    res.status(500).json({ message: `Failed to register user as already exists : ${error.detail}`  });
  }
});

app.post("/api/getdetails/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const {
      leetcode,
      codeforces,
      codechef,
      leetcodepref,
      codeforcespref,
      codechiefpref,
      gfg,
      gfgpref,
    } = req.body;

    // console.log({
    //   leetcodepref,
    //   codeforcespref,
    //   codechiefpref,
    //   gfgpref,
    // });

    const platformarray = [
      leetcodepref ? "leetcode" : null,
      codeforcespref ? "codeforces" : null,
      codechiefpref ? "codechef" : null,
      gfgpref ? "geeksforgeeks" : null,
    ].filter(Boolean); // Filter out `null` values

    const client = await pool.connect();

    try {
      // Start a transaction
      await client.query("BEGIN");

      // Ensure the user exists in the `users` table
      const userCheck = await client.query(
        "SELECT email FROM users WHERE email = $1",
        [email]
      );

      if (userCheck.rowCount === 0) {
        // Insert the user if they don't exist
        await client.query(
          "INSERT INTO users (email, preferences) VALUES ($1, $2)",
          [email, platformarray]
        );
      } else {
        // Update preferences if the user exists
        await client.query(
          "UPDATE users SET preferences = $1 WHERE email = $2",
          [platformarray, email]
        );
      }

      // Insert or update account details in the `accounts` table
      await client.query(
        `INSERT INTO accounts (email, leetcode, codeforces, codechef, geeksforgeeks) 
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (email) DO UPDATE 
         SET leetcode = $2, codeforces = $3, codechef = $4, geeksforgeeks = $5`,
        [email, leetcode, codeforces, codechef, gfg]
      );
      

      // Commit the transaction
      await client.query("COMMIT");

      res.status(200).json({ message: "Details updated successfully" });
    } catch (err) {
      // Roll back the transaction in case of an error
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Error adding data" });
  }
});


app.get("/updateDetails", async (req, res) => {
  try {
    const { leetcode, codechef, codeforces } = req.body;
    const leetcodeProfile = await axios.get(
      `https://leetcard.jacoblin.cool/${leetcode}?ext=contest`
    );

    const codechefProfile = await axios.get(
      `https://codechef-api.vercel.app/${codechef}`
    );

    const codeforcesProfile = await axios.get(
      `https://codeforces.com/api/user.info?handles=${codeforces}`
    );

    res.status(200).json({
      leetcodeProfile: leetcodeProfile.data,
      codechefProfile: codechefProfile.data,
      codeforcesProfile: codeforcesProfile.data,
    });
  } catch (error) {}
});

app.listen(Port, () => {
  console.log("Server is running on port 3001");
});
