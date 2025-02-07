import { Box } from "@mui/material";

const Modal = ({ children }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "black",
        opacity: "0.5",
      }}
    >
      {children}
    </Box>
  );
};

export default Modal;
