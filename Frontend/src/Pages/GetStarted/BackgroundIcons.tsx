import { Box, List, Typography } from "@mui/material";

import pdficon from "../../assets/pdficon.png";
import imageicon from "../../assets/imageicon.png";
import audioicon from "../../assets/audioicon.png";
import docicon from "../../assets/docicon.png";

const BackgroundIcons = () => {
  return (
    <Box
      sx={{
        position: {
          md: "relative",
          sm: "static",
          xs: "relative",
        },
      }}
    >
      <Box
        component="img"
        src={pdficon}
        sx={{
          position: "absolute",
          rotate: "-24deg",
          top: {
            md: -171,
            sm: 21,
            xs: -20,
          },
          right: 0,
          zIndex: -1,
          width: {
            xm: 300,
            xs: 200,
          },
        }}
      ></Box>
      <Box
        component="img"
        src={imageicon}
        sx={{
          position: "absolute",
          rotate: "15.59deg",
          top: {
            md: -75,
            sm: 120,
            xs: 20,
          },
          left: 10,
          zIndex: -1,
          width: 150,
        }}
      ></Box>
      <Box
        component="img"
        src={audioicon}
        sx={{
          position: "absolute",
          rotate: "15.59deg",
          bottom: {
            sm: -95,
            xs: 20,
          },
          left: 10,
          zIndex: -1,
          width: 150,
        }}
      ></Box>
      <Box
        component="img"
        src={docicon}
        sx={{
          position: "absolute",
          rotate: "-15.59deg",
          bottom: {
            sm: -122,
            xs: 10,
          },
          right: 50,
          zIndex: -1,
          width: 150,
        }}
      ></Box>
      <Typography variant="h3" fontWeight="700">
        <List>
          <li>Share up to 5 files for free.</li>
          <li>Shorter links, eliminating the need for URL shorteners.</li>
          <li>Files will be available for up to 10 minutes.</li>
        </List>
      </Typography>
    </Box>
  );
};

export default BackgroundIcons;
