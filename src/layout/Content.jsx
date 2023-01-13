import {Box} from "@mui/material";
import {useMessage} from "../utils/providers/MessageProvider";
import Message from "../components/Message";
import {useLoader} from "../utils/providers/LoadingProvider.jsx";
import LoadingScreen from "../components/LoadingScreen";
import {Outlet} from "react-router-dom";

export default function Content(props) {
    const {message} = useMessage();
    const {isLoading, loadingMessage} = useLoader();
    return (
        <>
            <Box className="main" sx={{p: 3}}>
                {props.children ? props.children : <Outlet/>}
            </Box>
            {message && <Message />}
            {isLoading && <LoadingScreen message={loadingMessage} />}
        </>

    )
}