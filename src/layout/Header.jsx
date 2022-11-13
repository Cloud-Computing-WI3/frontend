import * as React from 'react';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {Avatar, Link} from "@mui/material";
import {useProfile} from "../utils/providers/ProfileProvider";
import {useNavigate} from "react-router-dom";

export default function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const {user, logout, isAuthenticated} = useProfile();
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Link to="/" color="inherit" sx={{textDecoration: "none"}}>AppName</Link>
                    </Typography>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <Avatar>
                                {user ?
                                    `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`
                                    :
                                    <AccountCircle/>}

                            </Avatar>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {isAuthenticated ?
                                <>
                                    <MenuItem onClick={() => navigate("user")}>Profile</MenuItem>
                                    <MenuItem onClick={logout}>Logout</MenuItem>
                                </>
                                :
                                <MenuItem onClick={() => {
                                    navigate("login")
                                }}>Login</MenuItem>
                            }
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
