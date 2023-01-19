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
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {Avatar, Link} from "@mui/material";
import {useAccount} from "../utils/providers/AccountProvider.jsx";
import {useNavigate} from "react-router-dom";
import './Header.css';
import logo from "../assets/favicon.svg";


/**
* A header component that includes a navigation drawer and user account menu.
* Utilizes Material-UI components for styling.
* Includes links for navigating to the main page, keyword pages, and category pages.
* Utilizes the useAccount hook for handling user authentication and the useNavigate hook for navigating through pages.
*/

export default function Header() {
    // drawer navigation links
    const navigationLinks = [
        {name: "Top Articles", link: "/"},
        {name: "My Keywords", link: "/my/keywords"},
        {name: "My Categories", link: "/my/categories"},
        {name: "Technology", link: "/categories/technology"},
        {name: "Sports", link: "/categories/sports"},
        {name: "Business", link: "/categories/business"},
        {name: "Health", link: "/categories/health"},
        {name: "Entertainment", link: "/categories/entertainment"},
        {name: "Science", link: "/categories/science"},
    ]

    const [anchorEl, setAnchorEl] = useState(null);
    const {user, logout, isAuthenticated} = useAccount();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="fixed">
                <Toolbar className="navBar" sx={{minHeight: "20px"}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setOpen(true)}
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Box sx={{display: "flex", flexGrow: 1, alignItems: "center", justifyContent: "center", mb: 2}}>
                        <img src={logo} height="30" alt={"logo"} style={{float: "left"}}/>
                        <Typography variant="h6" component="div">
                            <Link to="/" color="inherit" sx={{textDecoration: "none", pl: 1, pt: 2}}>Newsify</Link>
                        </Typography>
                    </Box>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                        >
                            {user ?
                                user.picture ? <Avatar src={user.picture}/>
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
                                    setAnchorEl(null);
                                }
                                }>Profile</MenuItem>,
                                    <MenuItem key="logout" onClick={() => {
                                        logout();
                                        setAnchorEl(null);
                                    }
                                    }>Logout</MenuItem>]
                                :
                                <MenuItem key="login" onClick={() => {
                                    navigate("login")
                                    setAnchorEl(null);
                                }}>Login</MenuItem>
                            }
                        </Menu>
                    </div>
                </Toolbar>
                <SwipeableDrawer open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
                    <Toolbar sx={{minWidth: 250, maxWidth: 'md', display: "flex", justifyContent: "flex-end"}}>
                        <IconButton
                            size="large"
                            onClick={() => setOpen(false)}
                            color="inherit">
                            <ChevronLeftIcon/>
                        </IconButton>
                    </Toolbar>
                    <Divider/>
                    <List>
                        {
                            navigationLinks.map(link => (
                                <ListItem key={link.link}>
                                    <Typography variant="button" display="block" gutterBottom>
                                        <Link key={link.link} to={link.link} onClick={handleClose} color="inherit"
                                              sx={{textDecoration: "none", cursor:"pointer",  '&:hover': {
                                                textDecoration: "underline", fontWeight: "bold"
                                              },}}>{link.name}</Link>
                                    </Typography>
                                </ListItem>
                            ))
                        }
                    </List>
                </SwipeableDrawer>
            </AppBar>
        </Box>
    );
}
