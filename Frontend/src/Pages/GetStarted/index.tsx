import { Box, Stack } from "@mui/material";
import FileInput from "../../Component/FileInput";
import RecieveFile from "../../Component/RecieveFile";
import { useEffect, useState } from "react";

import BackgroundIcons from "./BackgroundIcons";
import CreateNodeModal from "../../Component/CreateNodeModal";

import { getCookie } from "../../utils/cookieUtils";
import { API_BASE_URL } from "../../constants";
import FileViewContainer from "../../Component/FileViewContainer";

const GetStarted = () => {
  const [files, setFiles] = useState([]);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [nodeid, setNodeid] = useState("");
  const [loading, setLoading] = useState(false);

  function deleteFile(id: number) {
    var tempFile = files;
    tempFile.splice(id, 1);
    setFiles([...tempFile]);
  }

  const handleFileUpload = (event: any) => {
    if (!event.target.files) return;

    const selectedFiles = event.target.files;
    setFiles([...files, ...selectedFiles]);
  };

  async function checkNodeAlreadyPresent() {
    const id = getCookie("nodeid");
    if (id) {
      setLoading(true);
      await fetch(`${API_BASE_URL}/node/owner/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPreviewFiles(data);
          console.log(data);
          setNodeid(id);
        })
        .catch((err) => console.log(err));
    }
    setLoading(false);
  }

  useEffect(() => {
    checkNodeAlreadyPresent();
  }, []);

  if (loading) {
    return <h1>Loading....</h1>;
  }

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
              <FileInput handleFileUpload={handleFileUpload} />
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
        <FileViewContainer nodeid={nodeid} files={previewFiles} />
      )}
    </Box>
  );
};

export default GetStarted;
