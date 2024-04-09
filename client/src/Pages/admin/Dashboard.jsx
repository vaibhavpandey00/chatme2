import React from 'react'
import AdminLayout from '../../Components/layout/AdminLayout'
import { Container, Paper, Stack, Typography, Box } from '@mui/material'
import { AdminPanelSettings as AdminPanelSettingsIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import moment from 'moment'
import { CurveButton, SearchField } from '../../Components/Styles/StyledComponents';

const Dashboard = () => {

    const AppBar = <Paper elevation={3} sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1rem",
    }} >
        <Stack direction={"row"} spacing={"1rem"} alignItems={"center"} >
            <AdminPanelSettingsIcon fontSize="large" />

            <SearchField placeholder="Search..." />

            <CurveButton  >Search</CurveButton>

            <Box flexGrow={1} />

            <Typography sx={{
                display: { xs: "none", lg: "block" },
            }} >{moment().format("dddd, D MMMM YYYY")}
            </Typography>

            <NotificationsIcon />
        </Stack>

    </Paper>

    const widgets = () => <></>

    return (
        <AdminLayout >
            <Container component={"main"}>

                {AppBar}

            <Stack >
                Chart Area
            </Stack>

            {
                widgets
            }

            </Container>
        </AdminLayout>
    )
}

export default Dashboard