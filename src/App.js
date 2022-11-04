import {ThemeProvider} from "@mui/material";
import theme from "./Theme";
import {Outlet} from "react-router-dom";
import Header from "./layout/Header";
import Content from "./layout/Content";

function App(props) {
  return (
    <ThemeProvider theme={theme}>
        <Header />
        <Content>
            {props.children ? props.children : <Outlet />}
        </Content>
    </ThemeProvider>
  );
}

export default App;
