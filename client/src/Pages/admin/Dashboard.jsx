import React from 'react'
import AdminLayout from '../../Components/layout/AdminLayout'
import { Container, Paper, Stack, Typography, Box } from '@mui/material'
import { AdminPanelSettings as AdminPanelSettingsIcon, Group as GroupIcon, Message as MessageIcon, Notifications as NotificationsIcon, Person as PersonIcon } from '@mui/icons-material';
import moment from 'moment'
import { CurveButton, SearchField } from '../../Components/Styles/StyledComponents';
import { DoughnutChart, LineChart } from '../../Components/specific/Charts';

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

    const Widgets = () => <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing="2rem"
        justifyContent="space-between"
        alignItems={"center"}
        margin={"2rem 0"}
    >

        <Widget title={"Users"} value={8} Icon={<PersonIcon />} />
        <Widget title={"Chats"} value={2} Icon={<GroupIcon />} />
        <Widget title={"Messages"} value={3} Icon={<MessageIcon />} />
    </Stack>

    return (
        <AdminLayout >
            <Container component={"main"}>
                {/* App Bar or Navigation */}
                {AppBar}

                {/* Line Chart */}
                <Stack direction={{ xs: "column", lg: "row" }} gap={"2rem"} flexWrap={"wrap"} justifyContent={"center"} alignItems={{ xs: "center", lg: "stretch" }} >
                    <Paper elevation={3} sx={{
                        padding: "2rem 3.5rem",
                        borderRadius: "1rem",
                        width: "100%",
                        maxWidth: "45rem",
                    }}>
                        <Typography variant="h4" margin={"2rem 0"} >Last Messages</Typography>
                        <LineChart value={[23, 10, 55, 70, 30, 45, 40]} />
                    </Paper>

                    {/* Doughnut Chart */}
                    <Paper elevation={3}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "1rem",
                            borderRadius: "1rem",
                            position: "relative",
                            width: {
                                xs: "100%",
                                sm: "50%"
                            },
                            width: "100%",
                            maxWidth: "25rem",
                        }} >
                        <DoughnutChart labels={["Group Chats", "Personal Chats"]} value={[30, 70]} />

                        <Stack direction={"row"} position={"absolute"} justifyContent={"center"} alignItems={"center"} spacing={"0.5rem"} width={"100%"} height={"100%"} >

                            <GroupIcon />
                            <Typography>Vs</Typography>
                            <PersonIcon />

                        </Stack>

                    </Paper>
                </Stack>

                <Widgets />
            </Container>
        </AdminLayout>
    )
};

const Widget = ({ title, value, Icon }) => <Paper
    sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1.5rem",
        width: "20rem",
    }} elevation={3}
>
    <Stack alignItems={"center"} spacing={"1rem"} >
        <Typography
            sx={{
                width: "5rem",
                height: "5rem",
                borderRadius: "50%",
                border: "5px solid rgba(0,0,0,0.9)",
                color: "rgba(0,0,0,0.7)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        > {value} </Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} >
            {Icon}
            <Typography > {title} </Typography>
        </Stack>
    </Stack>
</Paper>

export default Dashboard