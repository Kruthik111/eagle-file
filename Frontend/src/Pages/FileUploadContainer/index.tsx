import { Box, Button, Input, Paper, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const FileUploadContainer = () => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <Box component="div" sx={{ p: 5 }}>
      <Paper elevation={24}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "column",
            height: 300,
          }}
        >
          <Button
            component="label"
            sx={{
              border: "2px dashed black",
              display: "flex",
              flexDirection: "column",
              width: "60%",
              height: "60%",
            }}
            role={undefined}
            variant="text"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            UploadFiles
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => console.log(event.target.files)}
              multiple
            />
          </Button>
          <Button variant="contained">Send</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default FileUploadContainer;
