import { Box, Stack } from "@mui/material";
import FileInput from "../../Component/FileInput";
import RecieveFile from "../../Component/RecieveFile";
import { useState } from "react";

import BackgroundIcons from "./BackgroundIcons";
import CreateNodeModal from "../../Component/CreateNodeModal";

const GetStarted = () => {
  const [files, setFiles] = useState([]);
  // const handleOpen = () => setOpen(true);

  function deleteFile(id: number) {
    var tempFile = files;
    tempFile.splice(id, 1);
    setFiles([...tempFile]);
  }

  const handleFileUpload = (event) => {
    if (!event.target.files) return;
    const selectedFiles = event.target.files;
    // const selectedFiles = Array.from(event.target.files);
    // const newFiles = selectedFiles.filter((file) => !files.includes(file.name));
    setFiles([...files, ...selectedFiles]);
  };

  // function createNode() {}

  return (
    <Box>
      <Stack
        direction={{
          md: "row",
          xs: "column",
        }}
        sx={{
          alignItems: "center",
          p: 2,
        }}
        spacing={5}
      >
        <Stack
          sx={{
            flex: 1,
            maxWidth: "637px",
          }}
          spacing={2}
        >
          <FileInput
            files={files}
            setFiles={setFiles}
            handleFileUpload={handleFileUpload}
          />
          <RecieveFile />
        </Stack>

        <Box
          sx={{
            flex: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <BackgroundIcons />
        </Box>
      </Stack>
      {files.length > 0 && (
        <CreateNodeModal
          files={files}
          deleteFile={deleteFile}
          setFiles={setFiles}
          handleFileUpload={handleFileUpload}
          // createNode={createNode}
        />
      )}
    </Box>
  );
};

export default GetStarted;
