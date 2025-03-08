import { Box } from "@mui/material";

const CustomModal = ({ children, handleClickOutside, open }) => {
  if (!open) {
    return;
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 20,
        position: "absolute",
        background: "radial-gradient(#fff2 30%, #fff4)",
        backdropFilter: "blur(5px)",
        inset: 0,
      }}
      onClick={handleClickOutside}
    >
      <Box
        sx={{
          boxShadow: "0px 0px 5px black",
          borderRadius: 5,
          overflow: "hidden",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </Box>
    </Box>
  );
};

export default CustomModal;
