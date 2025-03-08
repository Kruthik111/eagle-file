import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import FileInput from "../../Component/FileInput";
import RecieveFile from "../../Component/RecieveFile";
import { useState } from "react";

import BackgroundIcons from "./BackgroundIcons";
import CreateNodeModal from "../../Component/CreateNodeModal";
import TableHeader from "../../Component/TableHeader";
import FileRow from "../../Component/FileRow";
import { FcEmptyTrash } from "react-icons/fc";
import ShareNode from "../../Component/ShareNode";

const GetStarted = () => {
  const [files, setFiles] = useState([]);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [nodeid, setNodeid] = useState("");
  const [openShareModal, setOpenShareModal] = useState(true);

  function deleteFile(id: number) {
    var tempFile = files;
    tempFile.splice(id, 1);
    setFiles([...tempFile]);
  }

  const handleFileUpload = (event) => {
    if (!event.target.files) return;

    const selectedFiles = event.target.files;
    setFiles([...files, ...selectedFiles]);
  };

  return (
    <Box>
      {previewFiles.length === 0 ? (
        <>
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
              setPreviewFiles={setPreviewFiles}
              setFiles={setFiles}
              handleFileUpload={handleFileUpload}
              setNodeid={setNodeid}
            />
          )}
        </>
      ) : (
        <Box sx={{ height: 400, width: "100%", m: 2, px: 2 }}>
          <Button onClick={() => setOpenShareModal(true)}>Share</Button>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="table">
              {/* Table header */}
              <TableHeader />

              {/* File files */}
              <TableBody>
                {previewFiles?.length > 0 ? (
                  previewFiles?.map((file, index) => (
                    <FileRow
                      id={index}
                      // toggleFileSelection={toggleFileSelection}
                      file={file}
                      // selectedFiles={selectedFiles}
                    />
                  ))
                ) : (
                  // If there is nothing inside the folder
                  <TableRow>
                    <TableCell colSpan={6} align="left">
                      <FcEmptyTrash size={400} width={"100%"} />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <ShareNode
            nodeid={nodeid}
            openShareModal={openShareModal}
            setOpenShareModal={setOpenShareModal}
          />
        </Box>
      )}
    </Box>
  );
};

export default GetStarted;
