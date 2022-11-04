import {Box} from "@mui/material";

export default function Content(props) {
    return (
        <Box className="main" sx={{p: 3}}>
            {props.children}
        </Box>
    )
}