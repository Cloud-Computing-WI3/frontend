import * as React from 'react';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
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
                            {user ?
                                user.avatar ? <Avatar src={user.avatar}/>
                                    : <Avatar alt={"Avatar"}>
                                        {user && user.first_name?.charAt(0)}
                                        {user && user.last_name?.charAt(0)}
                                    </Avatar>
                                : <Avatar/>}
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
                                [<MenuItem key={"profile"} onClick={() => {
                                    navigate("user");
                                }
                                }>Profile</MenuItem>,
                                    <MenuItem key="logout" onClick={logout}>Logout</MenuItem>]
                                :
                                <MenuItem key="login" onClick={() => {
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
