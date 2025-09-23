import * as React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Stack,
  Paper,
} from "@mui/material";

function About() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, message });
    alert("Your message was intercepted by Skynet");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <Box sx={{ display: "grid", gap: 3 }}>
      {}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Hobbies
        </Typography>
        <List dense>
          {[
            "DIY/tinkering",
            "Code",
            "Bikes",
            "Cars",
            "Remodeling/building",
            "Reading",
            "3D design/prototyping",
            "Music",
            "Woodworking",
            "Hiking",
            "Vidya/Boardgames",
          ].map((hobby) => (
            <ListItem key={hobby} disableGutters>
              <ListItemText primary={hobby} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Contact me
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            <TextField
              label="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
            <TextField
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              required
              multiline
              minRows={4}
            />
            <Button
              variant="contained"
              size="large"
              type="submit"
              sx={{ alignSelf: "flex-start" }}
            >
              Send
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}

export default About;
