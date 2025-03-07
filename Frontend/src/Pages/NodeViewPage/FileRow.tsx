import { Checkbox, TableCell, TableRow } from "@mui/material";
import { getReadableFileSizeString } from "../../utils/getReadableFileSizeFormat";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import RadioButtonUncheckedTwoToneIcon from "@mui/icons-material/RadioButtonUncheckedTwoTone";

import { BiSolidFilePdf } from "react-icons/bi";
import { FaFileImage } from "react-icons/fa6";
import DownloadButton from "../../Component/DownloadButton";

const FileRow = ({
  file,
  // toggleFileSelection,
  // selectedFiles,
  singleFileDownload,
  id,
}) => {
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
        {file.originalname}
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
