import { useState } from "react";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";

function MessageCard({ post, fetchPosts }) {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(post.username);
  const [message, setMessage] = useState(post.message);

  async function handleDelete() {
    await fetch(`http://localhost:5000/posts/${post.id}`, {
      method: "DELETE",
    });

    fetchPosts();
  }

  async function handleUpdate() {
    await fetch(`http://localhost:5000/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, message }),
    });

    setIsEditing(false);
    fetchPosts();
  }

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        {isEditing ? (
          <Box>
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
              minRows={2}
              label="Message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              sx={{ mb: 2 }}
            />

            <Button variant="contained" onClick={handleUpdate} sx={{ mr: 1 }}>
              Save
            </Button>

            <Button variant="outlined" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography variant="h6">{post.username}</Typography>
            <Typography sx={{ mb: 2 }}>{post.message}</Typography>

            <Button variant="outlined" onClick={() => setIsEditing(true)} sx={{ mr: 1 }}>
              Edit
            </Button>

            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default MessageCard;