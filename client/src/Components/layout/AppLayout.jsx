import React from 'react';
import { Grid } from '@mui/material'
import ChatList from "../specific/ChatList"
import { sampleChats } from '../Constans/SampleData'
import Profile from '../specific/Profile'
import Header from "../layout/Header";
import Title from "../Shared/Title";
import { useParams } from 'react-router-dom';
import Bgimage from "../../assets/homebg5.jpeg";


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
                    // backgroundImage: "linear-gradient(to top, #6785b1, #50a7c6, #5cc7c6, #96e2b8, #e0f6ae)"
                    backgroundImage: `url(${Bgimage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                }}>

                    <Grid container height={"calc(100vh - 4rem)"} sx={{ alignItems: "center", justifyContent: "center", padding: { sm: 2, md: 4 }, gap: 2, width: "100%", }}
                    >

                        <Grid item height={"100%"} sx={
                            {
                                display: { xs: "none", sm: "block" },
                                width: { sm: "18rem", md: "20rem", lg: "28rem" },
                                p: 1,
                                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                                borderRadius: "16px",
                                backdropFilter: "blur(5.2px)",
                                bgcolor: "rgba(233, 233, 233, 0.25)"
                            }}
                        >
                            <ChatList chats={sampleChats} chatId={ChatId} handleDeleteChat={handleDeleteChat} />
                            {/* <ChatList chats={[1, 2, 3, 4, 5]} /> */}
                        </Grid>

                        <Grid item height={"100%"} sx={{
                            width: { xs: "32rem", md: "32rem", lg: "56.9rem" },
                            p: { xs: "0", md: 1 },
                            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                            borderRadius: { xs: "0", sm: "16px", md: "16px", lg: "16px" },
                            backdropFilter: "blur(5.2px)",
                            bgcolor: "rgba(233, 233, 233, 0.25)",
                        }}>
                            <WrappedComponent {...props} />
                        </Grid>

                        <Grid item height={"100%"} sx={{
                            display: { xs: "none", lg: "block" },
                            width: { sm: "", md: "", lg: "28rem" },
                            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                            borderRadius: "16px",
                            backdropFilter: "blur(5.2px)",
                            bgcolor: "rgba(233, 233, 233, 0.25)"
                        }}>
                            <Profile />
                        </Grid>
                    </Grid >
                </div>
            </>
        )
    }

}

export default AppLayout