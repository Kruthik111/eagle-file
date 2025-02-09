import {
  Avatar,
  Box,
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
import AddPassword from "./AddPassword";
import { useNavigate } from "react-router-dom";

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

const CreateNodeModal = ({ files, deleteFile, setFiles, handleFileUpload }) => {
  const [loading, setLoading] = useState(false);
  const [addPassword, setAddPassword] = useState(false);
  const [passwordText, setPasswordText] = useState("");

  const navigate = useNavigate();
  async function createNode(event: any) {
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("password", passwordText);
    setLoading(true);
    // try {
    //   const response =
    await fetch("http://localhost:8000/node/new", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => navigate(`/share/${data.nodelink}`))
      .catch((err) => console.error("Upload Error:", err))
      .finally(() => {
        setLoading(false);
      });

    // const result = await response.json();
    // console.log(result.nodelink);
    // } catch (error) {
    //   console.error("Upload Error:", error);
    // } finally {
    //   setLoading(false);
    // }
  }
  return (
    <Modal
      open={true}
      onClose={() => {}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
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
          mt: {
            md: 10,
            xs: 20,
          },
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
          <AddPassword
            passwordText={passwordText}
            setPasswordText={setPasswordText}
          />
        )}
        <Stack gap={1} direction="row" justifyContent="space-between">
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => setAddPassword(!addPassword)}
          >
            {addPassword ? "Remove password" : " Secure with password"}
          </Button>
          <LoadingButton
            disabled={files.length > 3}
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
            loadingPosition="end"
          >
            Create Node
          </LoadingButton>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default CreateNodeModal;
