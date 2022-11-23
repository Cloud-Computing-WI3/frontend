import {ThemeProvider} from "@mui/material";
import theme from "./Theme";
import {Outlet} from "react-router-dom";
import Header from "./layout/Header";
import Content from "./layout/Content";
import {AccountProvider} from "./utils/providers/AccountProvider.jsx";
import {MessageProvider} from "./utils/providers/MessageProvider";

function App(props) {
    return (
        <ThemeProvider theme={theme}>
            <MessageProvider>
                <AccountProvider>
                    <Header/>
                    <Content>
                        {props.children ? props.children : <Outlet/>}
                    </Content>
                </AccountProvider>
            </MessageProvider>
        </ThemeProvider>
    );
}

export default App;
