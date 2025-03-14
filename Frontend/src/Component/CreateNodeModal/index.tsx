import {
  Avatar,
  Button,
  IconButton,
  Modal,
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import FileRow from "./FileRow";

import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordField from "../PasswordField";
import { API_BASE_URL } from "../../constants";
import CustomModal from "../CustomModal";
import { setCookie } from "../../utils/cookieUtils";

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

const CreateNodeModal = ({
  files,
  deleteFile,
  setFiles,
  setPreviewFiles,
  handleFileUpload,
  setNodeid,
}) => {
  const [loading, setLoading] = useState(false);
  const [addPassword, setAddPassword] = useState(false);
  const [passwordText, setPasswordText] = useState("");

  // const navigate = useNavigate();
  async function createNode(event: any) {
    event.preventDefault();
    if (files.length === 0) {
      alert("Please select files to upload.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    formData.append("password", passwordText);

    setLoading(true);

    await fetch(`${API_BASE_URL}/node/new`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          new Error("sorry");
          return;
        }
        return res.json();
      })
      .then((data) => {
        setPreviewFiles(data.files);
        setNodeid(`${data.nodeid}`);
        setCookie("nodeid", data.nodeid, 10);
      })
      // .then((data) => console.log(data))
      .catch((err) => console.error("Upload Error:", err))
      .finally(() => {
        setLoading(false);
      });
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
            Create Node
          </LoadingButton>
        </Stack>
      </Stack>
    </CustomModal>
  );
};

export default CreateNodeModal;
