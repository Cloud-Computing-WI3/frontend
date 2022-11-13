import {Box} from "@mui/material";
import {useMessage} from "../utils/providers/MessageProvider";
import Message from "../components/Message";
import {useProfile} from "../utils/providers/ProfileProvider";

export default function Content(props) {
    const {message} = useMessage();
    return (
        <>
            <Box className="main" sx={{p: 3}}>
                {props.children}
            </Box>
            {message && <Message />}
        </>

    )
}