import { useState } from "react";
import { Container, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import NavBar from "./Component/NavBar";
import FileContainer from "./Pages/FileContainer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00e676",
    },
    secondary: {
      main: "#607d8b",
    },
  },
});

function App() {
  const [allowDownload, setAllowDownload] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Container
        sx={(theme) => ({
          p: 0,
          [theme.breakpoints.up("md")]: { px: 10 },
        })}
        color="success"
      >
        <FileContainer setAllowDownload={setAllowDownload} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
