import React from 'react';
import { Grid } from '@mui/material'
import ChatList from "../specific/ChatList"
import { sampleChats } from '../Constans/SampleData'
import Profile from '../specific/Profile'
import Header from "../layout/Header";
import Title from "../Shared/Title";
import { useParams } from 'react-router-dom';


const AppLayout = () => WrappedComponent => {
    return (props) => {

        const params = useParams();
        const ChatId = params.chatId;

        const handleDeleteChat = (e, _id, groupChat) => {
            e.preventDefault();
            console.log("Delete Chat", _id, groupChat);
        }


        return (
            <>
                <Title />
                <Header />

                <div style={{
                    backgroundImage: "linear-gradient(to top, #6785b1, #50a7c6, #5cc7c6, #96e2b8, #e0f6ae)"
                }}>

                    <Grid container height={"calc(100vh - 4rem)"} sx={{ alignItems: "center", justifyContent: "center", padding: { md: 4, sm: 2 }, gap: 2, width: "100%", }}
                    >

                        <Grid item height={"100%"} sx={{ display: { xs: "none", sm: "block" }, width: { sm: "18rem", md: "20rem", lg: "28rem" }, boxShadow: 3, borderRadius: "20px", p: 1, backdropFilter: "blur(16px)", bgcolor: "rgba(255, 255, 255, 0.4)" }}>
                            <ChatList chats={sampleChats} chatId={ChatId} handleDeleteChat={handleDeleteChat} />
                            {/* <ChatList chats={[1, 2, 3, 4, 5]} /> */}
                        </Grid>

                        <Grid item height={"100%"} sx={{ boxShadow: 3, borderRadius: "20px", width: { xs: "32rem", md: "32rem", lg: "56.9rem" }, backdropFilter: "blur(16px)", bgcolor: "rgba(255, 255, 255, 0.4)" }}>
                            <WrappedComponent {...props} />
                        </Grid>

                        <Grid item height={"100%"} sx={{ display: { xs: "none", lg: "block" }, width: { sm: "", md: "", lg: "28rem" }, boxShadow: 3, borderRadius: "20px", backdropFilter: "blur(16px)", bgcolor: "rgba(255, 255, 255, 0.4)" }}>
                            <Profile />
                        </Grid>
                    </Grid >
                </div>
            </>
        )
    }

}

export default AppLayout