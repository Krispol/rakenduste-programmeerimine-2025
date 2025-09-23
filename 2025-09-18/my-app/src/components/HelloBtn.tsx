import { Box, Button, TextField, Stack } from "@mui/material";
import { useLocalStorage } from "../hooks/useLocalStorage";

function HelloBtn() {
  const [link, setLink] = useLocalStorage(
    "myWebsite",
    "https://dev.to/saiful7778/managing-local-storage-in-react-with-uselocalstorage-hook-hee"
  );

  return (
    <>
      <Box className="hello" sx={{ display: "grid", gap: 2 }}>
        <Stack spacing={2} direction="row">
          <TextField
            label="Website link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={() => window.open(link, "_blank")}
          >
            Visit
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default HelloBtn;
