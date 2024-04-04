import { Avatar, Stack, Typography } from '@mui/material';
import React from 'react'

const Profile = () => {
    return (
        <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
            <Avatar sx={{
                width: 200,
                height: 200,
                objectFit: "contain",
                marginBottom: "1rem",
                border: "5px solid black",
            }} />
            <ProfileCard text={"lorem impuls 10"} heading={"Hay! I'm using chatMe"} />
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