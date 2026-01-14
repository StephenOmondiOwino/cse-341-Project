
require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

const client = new MongoClient(process.env.MONGO_URI);

// Root route
app.get("/", async (req, res) => {
  try {
    await client.connect();
    res.send("Connected to MongoDB successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Connection failed");
  }
});

// REQUIRED FOR DEPLOYMENT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
