import { Delete } from "@mui/icons-material";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const FileRow = ({ filename, index, deleteFile }) => {
  return (
    <Stack
      key={index}
      direction="row"
      sx={{
        justifyContent: "space-between",
        bgcolor: "white",
        p: {
          md: 3,
          xs: 1,
        },
      }}
    >
      <Typography
        key={index}
        variant="h6"
        color="primary"
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          width: "60%",
          textOverflow: "ellipsis",
        }}
      >
        {filename}
      </Typography>
      <IconButton onClick={() => deleteFile(index)}>
        <CancelIcon color="primary" />
      </IconButton>
    </Stack>
  );
};

export default FileRow;
