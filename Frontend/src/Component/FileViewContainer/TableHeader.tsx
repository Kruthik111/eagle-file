import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import RadioButtonUncheckedTwoToneIcon from "@mui/icons-material/RadioButtonUncheckedTwoTone";

const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="center">
          <Checkbox
            icon={<RadioButtonUncheckedTwoToneIcon />}
            checkedIcon={<CheckCircleTwoToneIcon />}
          />
        </TableCell>
        {/* <TableCell align="left">
          <InsertDriveFileOutlinedIcon />
        </TableCell> */}
        <TableCell sx={{ fontWeight: "600" }} align="left">
          Name
        </TableCell>
        <TableCell sx={{ fontWeight: "600" }} align="left">
          File size
        </TableCell>
        <TableCell sx={{ fontWeight: "600" }} align="left">
          Created
        </TableCell>
        <TableCell sx={{ fontWeight: "600" }} align="left">
          Last Modified
        </TableCell>
        <TableCell sx={{ fontWeight: "600" }} align="left">
          Download
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
