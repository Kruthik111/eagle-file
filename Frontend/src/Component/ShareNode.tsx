import QRCode from "react-qr-code";
import CustomModal from "./CustomModal";
import {
  Box,
  InputAdornment,
  Link,
  Snackbar,
  Stack,
  styled,
  TextField,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ContentCopyOutlined } from "@mui/icons-material";
import ShareIcon from "@mui/icons-material/Share";

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

const ShareNode = ({ nodeid, openShareModal, setOpenShareModal }) => {
  const [showSnackBar, setShowSnackBar] = useState(false);

  function handleClickOutside() {
    setOpenShareModal(false);
  }

  function copyLink() {
    navigator.clipboard.writeText(`http://localhost:5173/share/${nodeid}`);
    setShowSnackBar(true);
  }

  function shareToWeb() {
    // Fallback, Tries to use API only
    // if navigator.share function is
    // available
    if (navigator.share) {
      navigator
        .share({
          // Title that occurs over
          // web share dialog
          title: "Access Node through this link",

          // URL to share
          url: `http://localhost:5173/share/${nodeid}`,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch((err) => {
          // Handle errors, if occurred
          console.log("Error while using Web share API:");
          console.log(err);
        });
    } else {
      // Alerts user if API not available
      alert("Browser doesn't support this API !");
    }
  }
  return (
    <CustomModal handleClickOutside={handleClickOutside} open={openShareModal}>
      <Box
        sx={{
          bgcolor: "white",
          py: 5,
          px: 10,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 1,
        }}
        onClick={(event) => {}}
      >
        <Typography variant="h3">Share Node</Typography>
        <QRCode size={150} value={`http://localhost:5173/share/${nodeid}`} />
        <Stack gap={2} direction="row">
          <Typography variant="h5">{nodeid}</Typography>
          <Tooltip title="share to web">
            <ShareIcon fontSize="medium" onClick={shareToWeb} />
          </Tooltip>
        </Stack>
        <TextField
          id="input-with-icon-textfield"
          variant="outlined"
          size="medium"
          value={`http://localhost:5173/share/${nodeid}`}
          onClick={copyLink}
          sx={{
            borderRadius: "80px",
            cursor: "pointer",
            width: 300,
          }}
          slotProps={{
            input: {
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <BootstrapTooltip title="Click here to Copy Link">
                    <ContentCopyOutlined
                      sx={{
                        width: "0.8em",
                        cursor: "pointer",
                      }}
                      color="primary"
                    />
                  </BootstrapTooltip>
                </InputAdornment>
              ),
            },
          }}
        />
        <Typography>Scan QR code or use the link</Typography>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={showSnackBar}
        onClose={() => setShowSnackBar(false)}
        message="Link copied to clipboard"
        autoHideDuration={3000}
      />
    </CustomModal>
  );
};

export default ShareNode;
