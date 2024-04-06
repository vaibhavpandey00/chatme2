import { Avatar, Stack, Typography } from '@mui/material';
import React from 'react';
import { Face as FaceIcon, AlternateEmail as UsernameIcon, CalendarMonthRounded as CalenderIcon } from "@mui/icons-material";
import moment from "moment";

const Profile = () => {
    return (
        <Stack spacing={"2rem"} direction={"column"} alignItems={"center"} mt={4} gap={3}>
            <Avatar sx={{
                width: 200,
                height: 200,
                objectFit: "contain",
                marginBottom: "1rem",
                border: "5px solid white",
            }} />
            <ProfileCard heading={"Bio"} text={"lorem impuls 10"} />
            <ProfileCard heading={"Username"} text={"JoneDoe69"} Icon={<UsernameIcon fontSize='medium' color='primary' />} />
            <ProfileCard heading={"Name"} text={"Jone Doe"} Icon={<FaceIcon fontSize='medium' color='primary' />} />
            <ProfileCard heading={"Joined"} text={moment("2024-01-02T00:00:00.000Z").fromNow()} Icon={<CalenderIcon fontSize='medium' color='primary' />} />
        </Stack>
    )
};

const ProfileCard = ({ text, Icon, heading }) => <Stack direction={"row"} spacing={1} alignItems={"center"} color={"white"} textAlign={"center"}>

    {Icon && Icon}

    <Stack>
        <Typography color={"black"} variant="body1">{text}</Typography>
        <Typography color={"gray"} variant="caption">{heading}</Typography>
    </Stack>

</Stack>

export default Profile