require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const client = new MongoClient(process.env.MONGO_URI);

let db;

// Connect once
async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db("cse341");
    console.log("Connected to cse341 database");
  }
}

connectDB();

// Root test
app.get("/", (req, res) => {
  res.send("API is running");
});

// GET all contacts
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await db.collection("contacts").find().toArray();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single contact
app.get("/contacts/:id", async (req, res) => {
  try {
    const contact = await db
      .collection("contacts")
      .findOne({ _id: new ObjectId(req.params.id) });

    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: "Invalid ID" });
  }
});

// REQUIRED FOR DEPLOYMENT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
