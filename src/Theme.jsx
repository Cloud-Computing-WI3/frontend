import { createTheme } from "@mui/material";
import { grey } from '@mui/material/colors';
import { Link as RouterLink } from "react-router-dom";
import { forwardRef } from "react";
import 'reset-css';

const LinkBehavior = forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/" {...props} role={undefined} />
));

const theme = createTheme({
    palette: {
        primary: {
            main: grey[900],
        }
    },
    typography: {
        h1: {
            fontSize: '3.5rem',
        },
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