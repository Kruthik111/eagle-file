import { Box, Button, Paper, styled, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const FileInput = ({ inputText = "Add Files", handleFileUpload }) => {
  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: "16px",
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 4,
        }}
      >
        <Button
          component="label"
          sx={{
            border: "3px dashed #FFC107",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "60%",
            minHeight: {
              md: 200,
              xs: 100,
            },
            bgcolor: "info",
            borderRadius: "12px",
            p: 5,
          }}
          onChange={handleFileUpload}
          role={undefined}
          variant="outlined"
          color="secondary"
          tabIndex={-1}
          startIcon={<CloudUploadIcon sx={{ scale: "2" }} />}
        >
          <Typography
            sx={{ mt: 1, textAlign: "center", fontWeight: 700 }}
            color="primary"
          >
            {inputText}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#918E8E",
              textTransform: "lowercase",
            }}
          >
            Drag & Drop or Click here
          </Typography>
          <Box sx={{ opacity: 0, position: "absolute" }}>
            <input multiple type="file" onChange={handleFileUpload} />
          </Box>
        </Button>
      </Box>
    </Paper>
  );
};

export default FileInput;
