import { Box, Stack } from "@mui/material";
import FileInput from "../../Component/FileInput";
import RecieveFile from "../../Component/RecieveFile";

const FileUploadContainer = () => {
  return (
    <Box>
      <Stack spacing={2}>
        <FileInput />
        <RecieveFile />
      </Stack>
    </Box>
  );
};

export default FileUploadContainer;
