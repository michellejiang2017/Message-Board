import { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import "./App.css";
import MessageForm from "./components/MessageForm";
import MessageList from "./components/MessageList";

function App() {
  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    const response = await fetch("http://localhost:5000/posts");
    const data = await response.json();
    setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Message Board
        </Typography>

        <MessageForm fetchPosts={fetchPosts} />
        <MessageList posts={posts} fetchPosts={fetchPosts} />
      </Box>
    </Container>
  );
}

export default App;