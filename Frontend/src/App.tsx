import { useState } from "react";
import { Container, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import FileContainer from "./Pages/NodeViewPage";
import { Route, Routes } from "react-router-dom";
import Header from "./Component/Header";
import GetStarted from "./Pages/GetStarted";
import NodeViewPage from "./Pages/NodeViewPage";
import { SnackbarProvider } from "notistack";

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
  typography: {
    fontFamily: ["raleway", "kavoon", "sans-serif"].join(","),
  },
});

function App() {
  const [allowDownload, setAllowDownload] = useState(false);

  return (
    <SnackbarProvider>
      <ThemeProvider theme={theme}>
        <Header />
        <Container
          sx={(theme) => ({
            pt: {
              md: 15,
              xs: 10,
            },
            [theme.breakpoints.up("md")]: { px: 0 },
            overflow: "hidden",
            maxWidth: "100dvw",
            minHeight: "100dvh",
            scrollBehavior: "smooth",
          })}
        >
          <Routes>
            <Route
              path="/node"
              element={<FileContainer setAllowDownload={setAllowDownload} />}
            />
            <Route path="/share/:nodeid" element={<NodeViewPage />} />
            <Route path="/" element={<GetStarted />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
