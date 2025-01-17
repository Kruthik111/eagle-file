import Paper from "@mui/material/Paper";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import RadioButtonUncheckedTwoToneIcon from "@mui/icons-material/RadioButtonUncheckedTwoTone";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

import FileDialog from "../../Component/FileDialog";

import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { FcEmptyTrash, FcFolder } from "react-icons/fc";
import LoadingFiles from "../../Component/LoadingFiles";
import TableHeader from "./TableHeader";

interface FileContainerProps {
  setAllowDownload: Dispatch<SetStateAction<boolean>>;
}

const FileContainer: React.FC<FileContainerProps> = () => {
  // const securedFileIds = [5, 6];
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  async function fetchData(): Promise<void> {
    setLoading(true);
    fetch("http://localhost:8000/data")
      .then((response) => response.json())
      .then((data) => setRows(data[0].contents))
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
      })
      .finally(() => setLoading(false));
  }
  useEffect(() => {
    fetchData();
    console.log(rows);
  }, []);
  if (loading) {
    return <LoadingFiles />;
  }
  if (error) {
    return <h1>Unable to Fetch</h1>;
  }

  // function containsAny(arr1: number[], arr2: number[]): boolean {
  //   return arr1.some((item) => arr2.includes(item));
  // }

  // function handleSelected(event: number[]): any {
  //   setAllowDownload(containsAny(event, securedFileIds));
  // }

  function handleCellClick(row: { type: String; contents: [] }) {
    if (row.type === "folder") {
      row.contents ? setRows(row.contents) : setRows([]);
      return;
    }
    setOpen(true);
  }

  return (
    <Paper sx={{ height: 400, width: "100%", m: 2 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          {/* Table header */}
          <TableHeader />
          <TableBody>
            {rows?.length > 0 ? (
              rows?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    align="center"
                    sx={{ maxWidth: "10px" }}
                    color="secondary"
                  >
                    <Checkbox
                      icon={<RadioButtonUncheckedTwoToneIcon />}
                      checkedIcon={<CheckCircleTwoToneIcon />}
                    />
                  </TableCell>
                  <TableCell align="left" color="#e5e5e5">
                    {row.type === "file" ? (
                      <InsertDriveFileIcon
                        sx={{
                          color: "#2196F3",
                        }}
                      />
                    ) : (
                      <FcFolder size={24} />
                    )}
                  </TableCell>
                  <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                    onClick={() => handleCellClick(row)}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="left">
                    {row.size}
                    {row.type === "folder" && " items"}
                  </TableCell>
                  <TableCell align="left">{row.created}</TableCell>
                  <TableCell align="left">{row.lastModified}</TableCell>
                </TableRow>
              ))
            ) : (
              // If there is nothing inside the folder
              <TableRow>
                <TableCell colSpan={6} align="left">
                  <FcEmptyTrash size={400} width={"100%"} />
                  {/* <img src={emptyIcon} alt="" style={{ height: "300px" }} /> */}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <FileDialog open={open} setOpen={setOpen} />
    </Paper>
  );
};

export default FileContainer;
