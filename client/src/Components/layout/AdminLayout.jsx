import { Close as CloseIcon, Dashboard as DashboardIcon, Groups as GroupsIcon, Logout as LogoutIcon, ManageAccounts as ManageAccountsIcon, Menu as MenuIcon, Message as MessageIcon } from '@mui/icons-material';
import { Box, Drawer, Grid, IconButton, Stack, Typography, styled } from '@mui/material';
import React, { useState } from 'react';
import { Link as LinkComponent, useLocation, Navigate } from 'react-router-dom';

const Link = styled(LinkComponent)`
text-decoration: none;
color: black;
padding: 1.2rem;
border-radius: 1rem;
&:hover {
    background-color: rgba(0,0,0,1.5);
    color: white;
}`

const adminTabs = [
    {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: <DashboardIcon />
    },
    {
        name: "Users",
        path: "/admin/users",
        icon: <ManageAccountsIcon />
    },
    {
        name: "Chats",
        path: "/admin/chats",
        icon: <GroupsIcon />
    },
    {
        name: "Messages",
        path: "/admin/messages",
        icon: <MessageIcon />
    }
]

const SideBar = ({ w = "100%", }) => {

    const location = useLocation();

    const logoutHandler = () => {
        console.log("logoutHandler");
    }

    return <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"} >
        <Typography variant="h5" textTransform={"uppercase"} color="initial">
            Admin
        </Typography>

        <Stack spacing={"1rem"} >

            {/* Admin Tabs */}
            {
                adminTabs.map((tab) => (
                    <Link key={tab.path} to={tab.path}
                        sx={
                            location.pathname === tab.path && {
                                bgcolor: "rgba(0,0,0,1.5)",
                                color: "white",
                            }
                        }
                    >
                        <Stack direction={"row"} spacing={"1rem"} alignItems={"center"} >
                            {tab.icon}
                            <Typography fontSize={"1.1rem"} > {tab.name} </Typography>
                        </Stack>
                    </Link>
                ))
            }

            <Link onClick={logoutHandler}
                sx={{
                    color: "red",
                    "&:hover": {
                        bgcolor: "rgba(255, 0, 0, 0.8)",
                        color: "white",
                    }
                }}
            >
                <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}  >
                    <LogoutIcon />
                    <Typography fontSize={"1.1rem"} > Log Out </Typography>
                </Stack>
            </Link>

        </Stack>
    </Stack>
}

const isAdmin = true;

const AdminLayout = ({ children }) => {

    if (!isAdmin) return <Navigate to="/admin" />

    const [isMobile, setIsMobile] = useState(false);

    const handleClose = () => {
        setIsMobile(false);
    }

    const handleMobile = () => {

        setIsMobile(!isMobile);
    }

    return (
        <Grid container minHeight={"100vh"}>

            <Box sx={{
                display: { xs: "block", md: "none" },
                bgcolor: "#f4f4f4",
                position: "fixed",
                right: "1rem",
                top: "1rem",
            }} >
                <IconButton aria-label="menu" onClick={handleMobile}>
                    {
                        isMobile ? <CloseIcon /> : <MenuIcon />
                    }
                </IconButton>
            </Box>

            <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
                <SideBar />
            </Grid>

            <Grid item xs={12} md={8} lg={9} sx={{
                bgcolor: "#f4f4f4",
                height: "100vh"
            }}>
                {children}
            </Grid>

            <Drawer open={isMobile} onClose={handleClose}>
                <SideBar w="50vw" />
            </Drawer>

        </Grid>
    )
}

export default AdminLayout;