const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
app.use(cors());

app.use(express.json());

// Import the router modules
const postsRouter = require("./routes/posts");

// Use the router modules
app.use("/posts", postsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});