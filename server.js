require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const client = new MongoClient(process.env.MONGO_URI);

app.get("/", async (req, res) => {
  try {
    await client.connect();
    res.send("Connected to MongoDB successfully!");
  } catch (error) {
    res.send("Connection failed");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
const contactsRoutes = require('./routes/contacts');
app.use('/contacts', contactsRoutes);
