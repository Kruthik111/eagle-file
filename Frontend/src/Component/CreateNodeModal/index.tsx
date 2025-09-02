import {
  Avatar,
  Button,
  IconButton,
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
  Alert,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import FileRow from "./FileRow";

import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, startTransition } from "react";
import PasswordField from "../PasswordField";
import { API_BASE_URL } from "../../constants";
import CustomModal from "../CustomModal";
import { setCookie } from "../../utils/cookieUtils";
import { safeFetch, handleServerError } from "../../utils/serverUtils";

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface CreateNodeModalProps {
  files: File[];
  deleteFile: (id: number) => void;
  setFiles: (files: File[]) => void;
  setPreviewFiles: (files: any[]) => void;
  handleFileUpload: (event: any) => void;
  setNodeid: (id: string) => void;
}

const CreateNodeModal = ({
  files,
  deleteFile,
  setFiles,
  setPreviewFiles,
  handleFileUpload,
  setNodeid,
}: CreateNodeModalProps) => {
  const [loading, setLoading] = useState(false);
  const [addPassword, setAddPassword] = useState(false);
  const [passwordText, setPasswordText] = useState("");
  const [error, setError] = useState("");

  // const navigate = useNavigate();
  async function createNode(event: any) {
    event.preventDefault();
    if (files.length === 0) {
      alert("Please select at least one file to upload.");
      return;
    }

    const formData = new FormData();
    files.forEach((file: File) => {
      formData.append("files", file);
    });

    formData.append("password", passwordText);

    setLoading(true);
    setError("");

    try {
      console.log("Attempting to upload files to:", `${API_BASE_URL}/node/new`);
      
      const response = await safeFetch(`${API_BASE_URL}/node/new`, {
        method: "POST",
        body: formData,
      });

      console.log("Upload response status:", response.status);
      
      if (!response.ok) {
        if (response.status === 413) {
          throw new Error("File size too large. Please try with smaller files.");
        } else if (response.status === 429) {
          throw new Error("Too many requests. Please wait a moment and try again.");
        } else {
          throw new Error("Upload failed. Please try again.");
        }
      }

      const data = await response.json();
      console.log("Upload successful, data:", data);
      
      startTransition(() => {
        setPreviewFiles(data.files);
        setNodeid(`${data.nodeid}`);
        setCookie("nodeid", data.nodeid, 10);
      });
    } catch (err: any) {
      console.error("Upload Error:", err);
      setError(handleServerError(err));
    } finally {
      setLoading(false);
    }
  }

  function togglePassword() {
    setPasswordText("");
    setAddPassword(!addPassword);
  }

  return (
    <CustomModal
      open={true}
      handleClickOutside={() => {}}
      // aria-labelledby="modal-modal-title"
      // aria-describedby="modal-modal-description"
    >
      <Stack
        gap={1}
        sx={{
          maxHeight: "70vh",
          maxWidth: "600px",
          m: "auto",
          p: {
            md: 5,
            xs: 2,
          },
          bgcolor: "white",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h3">Add Files</Typography>
          <Typography variant="h5"> Files: {files.length}</Typography>
          <IconButton aria-label="delete" onClick={() => setFiles([])}>
            <BootstrapTooltip title="Remove All Files">
              <Avatar sx={{ bgcolor: "red" }}>
                <DeleteIcon />
              </Avatar>
            </BootstrapTooltip>
          </IconButton>
          <IconButton component="label">
            <BootstrapTooltip title="Add More Files">
              <Avatar sx={{ bgcolor: "green" }}>
                <NoteAddOutlinedIcon />
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileUpload}
                  multiple
                />
              </Avatar>
            </BootstrapTooltip>
          </IconButton>
        </Stack>

        <Stack
          sx={{
            overflow: "auto",
          }}
        >
          {Object.values(files).map((file: any, index) => (
            <FileRow
              index={index}
              filename={file.name}
              deleteFile={() => deleteFile(index)}
            />
          ))}
        </Stack>
        
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        {addPassword && (
          <PasswordField
            passwordText={passwordText}
            setPasswordText={setPasswordText}
          />
        )}
        <Stack gap={1} direction="row" justifyContent="space-between">
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={togglePassword}
          >
            {addPassword ? "Remove password" : " Secure with password"}
          </Button>
          <LoadingButton
            disabled={files.length > 5}
            variant="contained"
            fullWidth
            onClick={createNode}
            sx={{
              "&:disabled": {
                cursor: "no-drop",
                pointerEvents: "all !important",
              },
            }}
            loading={loading}
            // loadingPosition="end"
          >
            {files.length > 5 ? "Too many files (max 5)" : "Create Share Link"}
          </LoadingButton>
        </Stack>
      </Stack>
    </CustomModal>
  );
};

export default CreateNodeModal;
