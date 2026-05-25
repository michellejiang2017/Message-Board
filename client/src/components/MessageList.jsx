import { Box, Typography } from "@mui/material";
import MessageCard from "./MessageCard";

function MessageList({ posts, fetchPosts }) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Messages
      </Typography>

      {posts.length === 0 ? (
        <Typography color="text.secondary">No messages yet.</Typography>
      ) : (
        posts.map((post) => (
          <MessageCard key={post.id} post={post} fetchPosts={fetchPosts} />
        ))
      )}
    </Box>
  );
}

export default MessageList;