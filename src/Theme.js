import {createTheme} from "@mui/material";
import { blue } from '@mui/material/colors';
import {Link as RouterLink} from "react-router-dom";
import {forwardRef} from "react";

const LinkBehavior = forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/" {...props} role={undefined} />
));

const theme = createTheme({
    palette: {
        primary: {
            main: blue[500],
        }
    },
    components: {
        MuiLink: {
            defaultProps: {
                component: LinkBehavior,
            },
        },
        MuiButtonBase: {
            defaultProps: {
                LinkComponent: LinkBehavior,
            },
        }
    }
})

export default theme;