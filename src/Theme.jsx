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
        },
        background: {
            default: grey[100],
            paper: '#fff',
        },
        text: {
            primary: '#000',
            secondary: '#000',
        }, 

    },
    typography: {
        h1: {
            fontSize: '3.5rem',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.01562em',
        },
        h2: {
            fontSize: '3rem',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.00833em',
        },
        h3: {
            fontSize: '2.5rem',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '0em',
        },
        h4: {
            fontSize: '2rem',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '0.00735em',
        },
        h5: {
            fontSize: '1.5rem',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '0em',
        },
        h6: {
            fontSize: '1.25rem',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '0.0075em',
        },
        p: {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: '0.00938em',
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: '0.00938em',
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: '0.01071em',
        },
        button: {
            fontSize: '0.875rem',
            fontWeight: 700,
            lineHeight: 1.5,
            letterSpacing: '0.02857em',
        },
        caption: {
            fontSize: '0.75rem',
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: '0.03333em',
        },
        overline: {
            fontSize: '0.75rem',
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: '0.08333em',
        },
        a: {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: '0.00938em',
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
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    margin: '1rem',
                },
            },
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    padding: '1rem',
                },
            },
        },
        
        
    }
})

export default theme;