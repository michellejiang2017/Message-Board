import { useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

function MessageForm({ fetchPosts }) {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, message }),
    });

    setUsername("");
    setMessage("");
    fetchPosts();
  }

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        New Message
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          multiline
          minRows={3}
          label="Message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained">
          Post Message
        </Button>
      </Box>
    </Paper>
  );
}

export default MessageForm;