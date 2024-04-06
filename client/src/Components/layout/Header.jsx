import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { Suspense, lazy, useState } from 'react';
import { Menu as MenuIcon, Search as SearchIcon, Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, Notifications as NotificationIcon } from "@mui/icons-material";

const SearchDialog = lazy(() => import("../dialogs/Search"));
const NotificationsDialog = lazy(() => import("../dialogs/Notifications"));
const NewGroupDialog = lazy(() => import("../dialogs/NewGroup"));

const Header = () => {

    const [isMobile, setIsMobile] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [isNewGroup, setIsNewGroup] = useState(false);
    const [isNotification, setIsNotification] = useState(false);

    const handleMobile = () => {
        setIsMobile(prev => !prev);
    }

    const openSearch = () => {
        setIsSearch(prev => !prev);
    }

    const openNewGroup = () => {
        setIsNewGroup(prev => !prev);
    }

    const openNotification = () => {
        setIsNotification(prev => !prev);
    }

    const ManageGroup = () => {
        console.log("ManageGroup");
    }

    const logoutHandler = () => {
        console.log("logoutHandler");
    }

    const IconBtn = ({ title, icon, onClick }) => {
        return (
            <Tooltip title={title}>
                <IconButton color="inherit" size="large" onClick={onClick}>
                    {icon}
                </IconButton>
            </Tooltip>
        )
    }

    return (
        <>
            <Box sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // border: "2px solid black"
            }} height={"4rem"}>

                <AppBar position="static" sx={{ bgcolor: "#ea7070" }}>
                    <Toolbar sx={{
                        justifyContent: "space-between"
                    }}>
                        <Typography sx={{ display: { xs: "none", sm: "block" } }}>ChatMe</Typography>

                        <Box sx={{
                            display: { xs: "block", sm: "none" },
                        }}>
                            <IconButton color="inherit" size="large">
                                <MenuIcon />
                            </IconButton>

                        </Box>

                        <Box sx={{
                            display: { xs: "none", sm: "block" }
                        }}>

                            <IconBtn
                                title={"Search User"}
                                onClick={openSearch}
                                icon={<SearchIcon />} />

                            <IconBtn
                                title={"New Group"}
                                onClick={openNewGroup}
                                icon={<AddIcon />} />

                            <IconBtn
                                title={"Manage Group"}
                                onClick={ManageGroup}
                                icon={<GroupIcon />} />

                            <IconBtn
                                title={"Notification"}
                                onClick={openNotification}
                                icon={<NotificationIcon />} />

                            <IconBtn
                                title={"Log out"}
                                onClick={logoutHandler}
                                icon={<LogoutIcon />} />
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            {isSearch && (<Suspense fallback={<Backdrop open />}>
                <SearchDialog />
            </Suspense>)}

            {isNotification && (<Suspense fallback={<Backdrop open />}>
                <NotificationsDialog />
            </Suspense>)}

            {isNewGroup && (<Suspense fallback={<Backdrop open />}>
                <NewGroupDialog />
            </Suspense>)}
        </>
    )
}

export default Header