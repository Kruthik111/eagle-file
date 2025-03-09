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
  Typography,
} from "@mui/material";
import { FcEmptyTrash } from "react-icons/fc";

// Icons

import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import FileRow from "./FileRow";
import TableHeader from "./TableHeader";
import ShareNode from "./ShareNode";

const FileViewContainer = ({ files, nodeid }) => {
  const [openShareModal, setOpenShareModal] = useState(true);
  return (
    <Box sx={{ height: 400, width: "100%", m: 2, px: 2 }}>
      <Stack
        direction="row"
        gap={5}
        justifyContent="space-between"
        sx={{
          mb: 5,
        }}
      >
        <Typography variant="h4" fontSize="5vmin">
          NodeID: {`${nodeid}`}
        </Typography>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => setOpenShareModal(true)}
        >
          Share
        </Button>
      </Stack>
      <TableContainer component={Paper} elevation={5}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="table">
          {/* Table header */}
          <TableHeader />

          {/* File Table */}
          <TableBody>
            {files?.length > 0 ? (
              files?.map((file, index) => (
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
  );
};

export default FileViewContainer;
