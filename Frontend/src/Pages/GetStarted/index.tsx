import { Box, Stack } from "@mui/material";
import FileInput from "../../Component/FileInput";
import RecieveFile from "../../Component/RecieveFile";
import { lazy, useEffect, useState, startTransition, Suspense } from "react";

import BackgroundIcons from "./BackgroundIcons";
const CreateNodeModal = lazy(() => import("../../Component/CreateNodeModal"));
const FileViewContainer = lazy(
  () => import("../../Component/FileViewContainer")
);

import { getCookie } from "../../utils/cookieUtils";
import { API_BASE_URL } from "../../constants";
import { safeFetch, handleServerError } from "../../utils/serverUtils";

const GetStarted = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewFiles, setPreviewFiles] = useState<any[]>([]);
  const [nodeid, setNodeid] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Preload lazy components
  useEffect(() => {
    // Preload CreateNodeModal
    const preloadCreateNodeModal = async () => {
      try {
        await import("../../Component/CreateNodeModal");
      } catch (error) {
        console.error("Failed to preload CreateNodeModal:", error);
      }
    };
    
    // Preload FileViewContainer
    const preloadFileViewContainer = async () => {
      try {
        await import("../../Component/FileViewContainer");
      } catch (error) {
        console.error("Failed to preload FileViewContainer:", error);
      }
    };

    preloadCreateNodeModal();
    preloadFileViewContainer();
  }, []);

  function deleteFile(id: number) {
    var tempFile = files;
    tempFile.splice(id, 1);
    setFiles([...tempFile]);
  }

  const handleFileUpload = (event: any) => {
    if (!event.target.files) return;

    const selectedFiles = event.target.files;
    // Use startTransition to prevent suspension
    startTransition(() => {
      setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    });
  };

  async function checkNodeAlreadyPresent() {
    const id = getCookie("nodeid");
    if (id) {
      setLoading(true);
      setError("");
      
      try {
        const response = await safeFetch(`${API_BASE_URL}/node/owner/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("File not found or may have expired.");
          } else {
            throw new Error("Unable to load files. Please try again.");
          }
        }
        
        const data = await response.json();
        
        startTransition(() => {
          setPreviewFiles(data);
          setNodeid(id);
        });
      } catch (err: any) {
        console.error("Error checking node:", err);
        setError(handleServerError(err));
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    checkNodeAlreadyPresent();
  }, []);

  if (loading) {
    return <h1>Loading....</h1>;
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <h2>Connection Issue</h2>
        <p>{error}</p>
        <button 
          onClick={() => {
            setError("");
            checkNodeAlreadyPresent();
          }}
          style={{
            padding: '8px 16px',
            backgroundColor: '#fca311',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '16px'
          }}
        >
          Try Again
        </button>
      </Box>
    );
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
            <Suspense fallback={<div>Loading modal...</div>}>
              <CreateNodeModal
                files={files}
                deleteFile={deleteFile}
                setPreviewFiles={setPreviewFiles}
                setFiles={setFiles}
                handleFileUpload={handleFileUpload}
                setNodeid={setNodeid}
              />
            </Suspense>
          )}
        </>
      ) : (
        <Suspense fallback={<div>Loading files...</div>}>
          <FileViewContainer nodeid={nodeid} files={previewFiles} />
        </Suspense>
      )}
    </Box>
  );
};

export default GetStarted;
