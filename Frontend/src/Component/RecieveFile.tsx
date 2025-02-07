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
            >
              Clear Text
            </Button>
            <Button
              variant="contained"
              sx={{
                color: "white",
                flex: 1,
              }}
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
