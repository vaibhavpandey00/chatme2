import { Box, Typography } from '@mui/material'
import React from 'react'
import AppLayout from '../Components/layout/AppLayout'

const Home = () => {
    return (

        <Box height={"100%"} p={"3rem"} borderRadius={"20px"}>
            <Typography textAlign={"center"} variant="body1" color="white">
                Select a Friend to chat
            </Typography>
        </Box>


    )
}

export default AppLayout()(Home);