import {
  Box,
  Button,
  Chip,
  Divider,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PasswordField from "../../Component/PasswordField";
import { LoadingButton } from "@mui/lab";
import { BASE_URL } from "../../constants";
import { useSnackbar, VariantType } from "notistack";

// Icons

import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 7,
};

const ValidatePasswordModal = ({ setPasswordRequired, setFiles, nodeid }) => {
  const [passwordText, setPasswordText] = useState("");
  const [validatingPassword, setValidatingPassword] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  async function validateNodePassword() {
    setValidatingPassword(true);
    await fetch(`${BASE_URL}/node/${nodeid}/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nodeid: nodeid,
        password: passwordText,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          enqueueSnackbar("Invalid Password!!!!", { variant: "error" });
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setFiles(data);
          setPasswordRequired(false);
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setValidatingPassword(false);
      });
  }

  return (
    <Modal open={true}>
      <Paper>
        <Box sx={style}>
          <Stack spacing={3} justifyContent="center">
            <div>
              <Typography color="primary" fontWeight="600" fontSize={30}>
                This Node is secured with password
              </Typography>
              <Typography>Provide password to access node</Typography>
            </div>
            <Divider>
              <Chip
                icon={<LockTwoToneIcon />}
                label="Secured"
                size="medium"
                color="primary"
              />
            </Divider>
            <PasswordField
              passwordText={passwordText}
              setPasswordText={setPasswordText}
            />
            <Stack gap={1} direction="row" justifyContent="space-between">
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => setPasswordText("")}
              >
                Clear
              </Button>
              <LoadingButton
                disabled={passwordText.length < 3}
                variant="contained"
                fullWidth
                onClick={validateNodePassword}
                sx={{
                  "&:disabled": {
                    cursor: "no-drop",
                    pointerEvents: "all !important",
                  },
                }}
                loading={validatingPassword}
                loadingPosition="end"
              >
                Validate Password
              </LoadingButton>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Modal>
  );
};

export default ValidatePasswordModal;
