import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

import FileDialog from "../../Component/FileDialog";
import { FcEmptyTrash } from "react-icons/fc";
import LoadingFiles from "../../Component/LoadingFiles";
import TableHeader from "./TableHeader";
import { useParams } from "react-router-dom";
import FileRow from "./FileRow.tsx";
import ValidatePasswordModal from "./ValidatePasswordModal.tsx";
import DownloadIcon from "@mui/icons-material/Download";
import { BASE_URL } from "../../constants.ts";

const NodeViewPage = () => {
  let { nodeid } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedFiles, setselectedFiles] = useState([]);

  async function fetchData(): Promise<void> {
    setLoading(true);
    await fetch(`${BASE_URL}/node/${nodeid}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.requiresPassword) {
          setPasswordRequired(true);
        } else {
          setFiles(data);
          console.log(data);
        }
      })
      .catch((err) => {
        console.log("error occured while fetching node data ", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function singleDownload(fid: Number) {
    // await fetch(`${BASE_URL}/node/single`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     fidArr: [...selectedFiles],
    //   }),
    // });
    window.location.href = `http://localhost:8000/node/single/${fid}`;
  }

  async function downloadFiles() {
    if (selectedFiles.length === 0) {
      return;
    }
    await fetch(`${BASE_URL}/node/download`, {
      method: "POST",
      body: JSON.stringify({
        fileIds: selectedFiles,
      }),
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <LoadingFiles />;
  }

  if (error) {
    return <h1>Unable to Fetch</h1>;
  }

  if (passwordRequired) {
    return (
      <Box
        sx={{
          height: "100dvh",
          width: "100vw",
          p: 10,
        }}
        color="red"
      >
        <LoadingFiles />
        <ValidatePasswordModal
          nodeid={nodeid}
          setPasswordRequired={setPasswordRequired}
          setFiles={setFiles}
        />
      </Box>
    );
  }

  function toggleFileSelection(fid: String) {
    var tempArr: String[] = [...selectedFiles];
    if (tempArr.includes(fid)) {
      tempArr.splice(tempArr.indexOf(fid), 1);
      setselectedFiles(tempArr);
    } else {
      setselectedFiles([...tempArr, fid]);
    }
  }

  return (
    <Paper sx={{ height: 400, width: "100%", m: 2 }}>
      <Button onClick={downloadFiles}>
        <DownloadIcon />
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          {/* Table header */}
          <TableHeader />

          {/* File files */}
          <TableBody>
            {files?.length > 0 ? (
              files?.map((file) => (
                <FileRow
                  toggleFileSelection={toggleFileSelection}
                  file={file}
                  selectedFiles={selectedFiles}
                  singleDownload={singleDownload}
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
      <FileDialog open={open} setOpen={setOpen} />
    </Paper>
  );
};

export default NodeViewPage;
