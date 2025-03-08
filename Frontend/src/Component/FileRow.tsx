import { Checkbox, TableCell, TableRow, Typography } from "@mui/material";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import RadioButtonUncheckedTwoToneIcon from "@mui/icons-material/RadioButtonUncheckedTwoTone";

import { BiSolidFilePdf } from "react-icons/bi";
import { FaFileImage } from "react-icons/fa6";
import { BASE_URL } from "../constants";
import { getReadableFileSizeString } from "../utils/getReadableFileSizeFormat";
import DownloadButton from "./DownloadButton";

const FileRow = ({
  file,
  // toggleFileSelection,
  // selectedFiles,
  id,
}) => {
  async function singleFileDownload(fid: Number) {
    window.location.href = `${BASE_URL}/file/download/${fid}`;
  }

  const fileIcons = {
    pdf: <BiSolidFilePdf size={20} color="red" />,
    png: <FaFileImage size={20} color="blue" />,
    webp: <FaFileImage size={20} color="blue" />,
    jpg: <FaFileImage size={20} color="blue" />,
    jpeg: <FaFileImage size={20} color="blue" />,
  };

  return (
    <TableRow key={id}>
      <TableCell align="center" sx={{ maxWidth: "10px" }} color="secondary">
        <Checkbox
          icon={<RadioButtonUncheckedTwoToneIcon />}
          checkedIcon={<CheckCircleTwoToneIcon />}
          // onClick={() => toggleFileSelection(file._id)}
          // checked={selectedFiles.includes(file._id)}
        />
      </TableCell>
      <TableCell
        sx={{
          gap: "2px",
        }}
      >
        {fileIcons["png"]}
        <Typography
          variant="caption"
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            maxWidth: 1,
            textOverflow: "ellipsis",
          }}
        >
          {file.originalname}
        </Typography>
      </TableCell>
      <TableCell>{getReadableFileSizeString(file.size)}</TableCell>
      <TableCell>{file.createdAt}</TableCell>
      <TableCell>{file.updatedAt}</TableCell>
      <TableCell onClick={() => singleFileDownload(file._id)}>
        <DownloadButton />
      </TableCell>
    </TableRow>
  );
};

export default FileRow;
