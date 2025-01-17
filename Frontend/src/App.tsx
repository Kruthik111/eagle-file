import { useState } from "react";
import { Container, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import FileContainer from "./Pages/FileContainer";
import { Route, Routes } from "react-router-dom";
import Header from "./Component/Header";
import FileUploadContainer from "./Pages/FileUploadContainer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#13203b",
    },
    secondary: {
      main: "#fca311",
    },
    info: {
      main: "#e5e5e5",
    },
  },
});

function App() {
  const [allowDownload, setAllowDownload] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container
        sx={(theme) => ({
          p: 0,
          [theme.breakpoints.up("md")]: { px: 10 },
        })}
        color="success"
      >
        <Routes>
          <Route
            element={<FileContainer setAllowDownload={setAllowDownload} />}
          />
          <Route path="/" element={<FileUploadContainer />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
