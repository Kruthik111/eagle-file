import { ContentPaste, Link } from "@mui/icons-material";
import {
  Box,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  Tooltip,
  styled,
  tooltipClasses,
  TooltipProps,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

const RecieveFile = () => {
  const [nodeLink, setNodeLink] = useState("");
  const navigate = useNavigate();

  function viewNode() {
    const nodeid = nodeLink.slice(-5);
    if (nodeLink) {
      navigate(`/share/${nodeid}`);
    }
  }

  async function pasteLink() {
    const text = await navigator.clipboard.readText();
    setNodeLink(text);
  }

  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: "12px",
      }}
    >
      <Box
        sx={{
          px: 1,
          py: 5,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6">Recieve Files</Typography>
          <TextField
            id="input-with-icon-textfield"
            variant="outlined"
            size="small"
            value={nodeLink}
            onChange={(event) => setNodeLink(event.target.value)}
            sx={{
              borderRadius: "80px",
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Link color="primary" />
                  </InputAdornment>
                ),
                placeholder: "https:eagle-file.io/share/XXXXX",
                endAdornment: (
                  <InputAdornment position="end">
                    <BootstrapTooltip title="Click here to Paste">
                      <ContentPaste
                        sx={{
                          width: "0.8em",
                          cursor: "pointer",
                        }}
                        color="primary"
                        onClick={pasteLink}
                      />
                    </BootstrapTooltip>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Stack direction="row">
            <Button
              variant="outlined"
              sx={{
                flex: 1,
              }}
              color="secondary"
              onClick={() => setNodeLink("")}
            >
              Clear Text
            </Button>
            <Button
              variant="contained"
              sx={{
                color: "white",
                flex: 1,
              }}
              onClick={viewNode}
            >
              Recieve Files
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};

export default RecieveFile;
