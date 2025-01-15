import DownloadIcon from "@mui/icons-material/Download";
import { IconButton, Tooltip } from "@mui/material";

const DownloadButton = () => {
  return (
    <Tooltip title="Download" arrow>
      <IconButton>
        <DownloadIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DownloadButton;
