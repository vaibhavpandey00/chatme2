import React from 'react'
import { Grid } from '@mui/material'
import Header from '../Components/layout/Header'
import ChatList from "../Components/specific/ChatList"
import { sampleChats } from '../Constans/SampleData'
import Profile from '../Components/specific/Profile'

const Home = () => {
    return (
        <>
            <Header />
            <Grid container height={"calc(100vh - 4rem)"} sx={{ alignItems: "center", justifyContent: "center", padding: { md: 4, sm: 2 }, gap: 2, width: "100%", }}>

                <Grid item height={"100%"} sx={{ display: { xs: "none", sm: "block" }, width: { sm: "18rem", md: "20rem", lg: "28rem" }, boxShadow: 3, borderRadius: "20px", bgcolor: "white", p: 1, }}>
                    <ChatList chats={sampleChats} chatId={"1"}  />
                    {/* <ChatList chats={[1, 2, 3, 4, 5]} /> */}
                </Grid>

                <Grid item height={"100%"} sx={{ boxShadow: 3, borderRadius: "20px", width: { xs: "32rem", md: "32rem", lg: "56.9rem" }, bgcolor: "white" }}>2</Grid>

                <Grid item height={"100%"} sx={{ display: { xs: "none", lg: "block" }, width: { sm: "", md: "", lg: "28rem" }, boxShadow: 3, borderRadius: "20px", bgcolor: "white" }}>
                    <Profile />
                </Grid>
            </Grid >
        </>

    )
}

export default Home