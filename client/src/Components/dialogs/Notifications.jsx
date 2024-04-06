import { Close as CancelIcon, Done as CheckIcon } from "@mui/icons-material";
import { Avatar, Dialog, DialogTitle, IconButton, ListItem, Stack, Tooltip, Typography } from "@mui/material";
import React, { memo } from 'react';
import { sampleNotifications } from '../Constans/SampleData';


const Notifications = () => {

    const friendRequestHandler = ({ _id, accept }) => {

    }

    return (
        <Dialog open>
            <Stack p={"2rem"} direction={"column"} width={"28rem"} >
                <DialogTitle textAlign={"center"} >Notifications</DialogTitle>

                {
                    sampleNotifications.length > 0 ? (
                        sampleNotifications.map((i) => <NotificationItem sender={i.sender} _id={i._id} handler={friendRequestHandler} key={i._id} />)
                    ) : <Typography variant="h6" color="initial" textAlign={"center"} >No New Notifications</Typography>
                }

            </Stack>
        </Dialog>

    )
}

const NotificationItem = memo(({ sender, _id, handler }) => {

    const { name, avatar } = sender;

    return (
        <ListItem >
            <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={1} width={"100%"} height={"5rem"}  >

                <Avatar src={avatar} />

                <Stack sx={{
                    // border: "1px solid black",
                    height: "100%",
                    flexGrow: 1
                }} justifyContent={"center"}>
                    <Typography
                        variant="h6"
                        sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                        color="initial"
                    >{name}</Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                        color="initial"
                    >has sent a Friend request</Typography>

                </Stack>

                <Stack direction={{
                    xs: "column",
                    sm: "row"
                }} >

                    <Tooltip title={"Accept"} >
                        <IconButton onClick={() => handler({ _id, accept: true })}>
                            <CheckIcon color={"success"} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title={"Reject"} >
                        <IconButton onClick={() => handler({ _id, accept: false })}>
                            <CancelIcon color={"error"} />
                        </IconButton>
                    </Tooltip>

                </Stack>

            </Stack>

        </ListItem>
    )
})

export default Notifications