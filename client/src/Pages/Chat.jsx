import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { IconButton, Stack } from "@mui/material";
import React, { useRef } from 'react';
import { InputBox } from '../Components/Styles/StyledComponents';
import FileMenu from '../Components/dialogs/FileMenu';
import AppLayout from '../Components/layout/AppLayout';
import { sampleMessage } from '../Components/Constans/SampleData';
import MessageComponent from '../Components/Shared/MessageComponent';

const Chat = () => {

    const containerRef = useRef(null);

    const user = {
        _id: "asdcasd",
        name: "Jack"
    }


    return (
        <>
            <Stack
                ref={containerRef}
                boxSizing={"border-box"}
                padding={"1rem"}
                spacing={"1rem"}
                height={"92%"}
                borderRadius={"20px"}
                sx={{
                    overflowX: "hidden",
                    overflowY: "auto"
                }}
            >
                {
                    sampleMessage.map((i) => (
                        <MessageComponent key={i._id} message={i} user={user} />
                    ))
                }
            </Stack>

            <form style={{ height: "8%", borderRadius: "20px", }}>

                <Stack direction={"row"} height={"100%"} alignItems={"center"} position={"relative"} >

                    <IconButton
                        sx={{
                            position: "absolute",
                            rotate: "30deg"
                        }}

                    >
                        <AttachFileIcon />
                    </IconButton>

                    <InputBox placeholder="Type Message Here..." />

                    <IconButton type="submit" sx={{
                        "&:hover": {
                            bgcolor: "primary.main"
                        }
                    }} >
                        <SendIcon />
                    </IconButton>

                </Stack>
            </form>

            <FileMenu />
        </>
    )
}

export default AppLayout()(Chat);