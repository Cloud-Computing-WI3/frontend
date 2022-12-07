import {ThemeProvider} from "@mui/material";
import theme from "./Theme";
import {Outlet} from "react-router-dom";
import Header from "./layout/Header";
import Content from "./layout/Content";
import {AccountProvider} from "./utils/providers/AccountProvider.jsx";
import {MessageProvider} from "./utils/providers/MessageProvider";
import {LoadingProvider} from "./utils/providers/LoadingProvider.jsx";

function App(props) {
    return (
        <ThemeProvider theme={theme}>
            <LoadingProvider>
                <MessageProvider>
                    <AccountProvider>
                        <Header/>
                        <Content />
                    </AccountProvider>
                </MessageProvider>
            </LoadingProvider>
        </ThemeProvider>
    );
}

export default App;
