import { useEffect, useState } from "react";
import {
  Box,
  // Button,
} from "@mui/material";

import LoadingFiles from "../../Component/LoadingFiles";
import { useParams } from "react-router-dom";
import ValidatePasswordModal from "./ValidatePasswordModal.tsx";
// import DownloadIcon from "@mui/icons-material/Download";
import { API_BASE_URL } from "../../constants.ts";
import FileViewContainer from "../../Component/FileViewContainer/index.tsx";

const NodeViewPage = () => {
  let { nodeid } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const [passwordRequired, setPasswordRequired] = useState(false);
  // const [selectedFiles, setselectedFiles] = useState([]);

  async function fetchData(): Promise<void> {
    setLoading(true);
    await fetch(`${API_BASE_URL}/node/${nodeid}`)
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
  //   await fetch(`${API_BASE_URL}/node/download`, {
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
      <FileViewContainer nodeid={nodeid} files={files} />
    </Box>
  );
};

export default NodeViewPage;
