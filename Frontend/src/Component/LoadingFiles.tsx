import { Paper, Skeleton } from "@mui/material";
import React from "react";

const LoadingFiles = () => {
  return (
    <Paper>
      <Skeleton height={60} animation="wave" />
      <Skeleton height={60} animation="wave" />
      <Skeleton height={60} animation="wave" />
      <Skeleton height={60} animation="wave" />
      <Skeleton height={60} animation="wave" />
    </Paper>
  );
};

export default LoadingFiles;
