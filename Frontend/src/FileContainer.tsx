import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import FileDialog from "./Component/FileDialog";

import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import RadioButtonUncheckedTwoToneIcon from "@mui/icons-material/RadioButtonUncheckedTwoTone";
import { FcEmptyTrash, FcFolder } from "react-icons/fc";
import LoadingFiles from "./Component/LoadingFiles";

interface NumberListProps {
  setAllowDownload: Dispatch<SetStateAction<boolean>>;
}

// const paginationModel = { page: 0, pageSize: 5 };

const FileContainer: React.FC<> = ({ setAllowDownload }) => {};

export default FileContainer;
