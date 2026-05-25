const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const db = require("./firebase");

app.post("/posts", async (req, res) => {
  try {
    const { username, message } = req.body;

    const docRef = await db.collection("posts").add({
      username,
      message,
      createdAt: new Date(),
    });

    res.json({
      id: docRef.id,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});