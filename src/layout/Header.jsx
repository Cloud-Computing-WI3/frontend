import * as React from 'react';
import { useState } from 'react';
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
import { Avatar, Link } from "@mui/material";
import { useAccount } from "../utils/providers/AccountProvider.jsx";
import { useNavigate } from "react-router-dom";

export default function Header() {

    // drawer navigation links
    const navigationLinks = [
        {name: "Top Articles", link: "/"},
        {name: "My Keywords", link: "/my/keywords"},
        // my categories --> testwise for keywords 'health' and 'sports'
        {name: "My Categories", link: "/my/categories"},
        // category pages
        {name: "Technology", link:"/categories/technology"},
        {name: "Sports", link: "/categories/sports"},
        {name: "Business", link: "/categories/business"},
        {name: "Health", link: "/categories/health"},
        {name: "Entertainment", link: "/categories/entertainment"},
        {name: "Science", link: "/categories/science"},
    ]

    const [anchorEl, setAnchorEl] = useState(null);
    const { user, logout, isAuthenticated } = useAccount();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setOpen(true)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" color="inherit" sx={{ textDecoration: "none" }}>Newsify</Link>
                    </Typography>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                        >
                            {user ?
                                user.picture ? <Avatar src={user.picture} />
                                    : <Avatar alt={"Avatar"}>
                                        {user && user.first_name?.charAt(0)}
                                        {user && user.last_name?.charAt(0)}
                                    </Avatar>
                                : <Avatar />}
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
                <SwipeableDrawer open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
                    <Toolbar sx={{ minWidth: 250, maxWidth: 'md', display: "flex", justifyContent: "flex-end" }}>
                        <IconButton
                            size="large"
                            onClick={() => setOpen(false)}
                            color="inherit">
                            <ChevronLeftIcon  />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List>
                        {
                            navigationLinks.map(link => (
                                <ListItem key={link.link}>
                                    <Typography variant="button" display="block" gutterBottom>
                                        <Link  key={link.link} to={link.link} color="inherit" sx={{ textDecoration: "none" }} onClick={() => setOpen(false)}>{link.name}</Link>
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
