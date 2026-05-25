const express = require("express");
const router = express.Router();
const db = require("../firebase");

// GET all posts
router.get("/", async (req, res) => {
  try {
    const snapshot = await db
      .collection("posts")
      .orderBy("createdAt", "desc")
      .get();

    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET recent posts
router.get("/recent", async (req, res) => {
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const snapshot = await db
      .collection("posts")
      .where("createdAt", ">=", oneHourAgo)
      .orderBy("createdAt", "desc")
      .get();

    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new post
router.post("/", async (req, res) => {
  try {
    const { username, message } = req.body;

    if (!username || !message) {
      return res.status(400).json({ error: "Username and message are required." });
    }

    const newPost = {
      username,
      message,
      createdAt: new Date(),
    };

    const docRef = await db.collection("posts").add(newPost);

    res.status(201).json({
      id: docRef.id,
      ...newPost,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update post
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, message } = req.body;

    await db.collection("posts").doc(id).update({
      username,
      message,
      updatedAt: new Date(),
    });

    res.json({ message: "Post updated successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE post
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.collection("posts").doc(id).delete();

    res.json({ message: "Post deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;