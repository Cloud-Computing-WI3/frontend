import {ThemeProvider} from "@mui/material";
import theme from "./Theme";
import {Outlet} from "react-router-dom";
import Header from "./layout/Header";
import Content from "./layout/Content";
import {ProfileProvider} from "./utils/providers/ProfileProvider";
import {MessageProvider} from "./utils/providers/MessageProvider";

function App(props) {
    return (
        <ThemeProvider theme={theme}>
            <MessageProvider>
                <ProfileProvider>
                    <Header/>
                    <Content>
                        {props.children ? props.children : <Outlet/>}
                    </Content>
                </ProfileProvider>
            </MessageProvider>
        </ThemeProvider>
    );
}

export default App;
