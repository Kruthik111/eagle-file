import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import {
  Box,
  // Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

import { FcEmptyTrash } from "react-icons/fc";
import LoadingFiles from "../../Component/LoadingFiles";
import TableHeader from "../../Component/TableHeader.tsx";
import { useParams } from "react-router-dom";
import ValidatePasswordModal from "./ValidatePasswordModal.tsx";
// import DownloadIcon from "@mui/icons-material/Download";
import { BASE_URL } from "../../constants.ts";
import FileRow from "../../Component/FileRow.tsx";

const NodeViewPage = () => {
  let { nodeid } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const [passwordRequired, setPasswordRequired] = useState(false);
  // const [selectedFiles, setselectedFiles] = useState([]);

  async function fetchData(): Promise<void> {
    setLoading(true);
    await fetch(`${BASE_URL}/node/${nodeid}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.requiresPassword) {
          setPasswordRequired(true);
        } else {
          setFiles(data);
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

  // async function downloadFiles() {
  //   if (selectedFiles.length === 0) {
  //     return;
  //   }
  //   await fetch(`${BASE_URL}/node/download`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       fileIds: selectedFiles,
  //     }),
  //   });
  // }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <LoadingFiles />;
  }

  if (error) {
    return <h1> Unable to Fetch</h1>;
  }

  if (passwordRequired) {
    return (
      <ValidatePasswordModal
        nodeid={nodeid}
        setPasswordRequired={setPasswordRequired}
        setFiles={setFiles}
      />
    );
  }

  // function toggleFileSelection(fid: String) {
  //   var tempArr: String[] = [...selectedFiles];
  //   if (tempArr.includes(fid)) {
  //     tempArr.splice(tempArr.indexOf(fid), 1);
  //     setselectedFiles(tempArr);
  //   } else {
  //     setselectedFiles([...tempArr, fid]);
  //   }
  // }

  return (
    <Box sx={{ height: 400, width: "100%", m: 2 }}>
      {/* <Button onClick={downloadFiles}>
        <DownloadIcon />
      </Button> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="table">
          {/* Table header */}
          <TableHeader />

          {/* File files */}
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
    </Box>
  );
};

export default NodeViewPage;
