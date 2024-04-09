import React, { memo } from 'react'
import { themeColor } from "../Constans/Colour";
import { Typography, Box } from '@mui/material'
import moment from 'moment';
import { fileFormat } from '../../lib/Features';
import RenderAttachment from './RenderAttachment';



const MessageComponent = ({ message, user }) => {

    const { sender, content, attachments = [], createdAt } = message;
    const sameSender = sender?._id === user?._id;

    const timeAgo = moment(createdAt).fromNow();

    return (
        <div
            style={{
                alignSelf: sameSender ? "flex-end" : "flex-start",
                width: "fit-content",
            }}
        >
            {!sameSender && <Typography fontSize={12} fontWeight={500} color="rgba(255,255,255,0.7)">{sender.name}</Typography>}

            {sameSender && <Typography fontSize={12} textAlign={"end"} color="rgba(255,255,255,0.7)">You</Typography>}

            <div
                style={{
                    backgroundColor: sameSender ? "white" : '#82b1ff',
                    color: sameSender ? "black" : "white",
                    padding: "10px",
                    borderRadius: "10px",
                }}
            >
                {content && <Typography color="initial"> {content} </Typography>}

                {
                    attachments.length > 0 && (
                        attachments.map((attachment, index) => {
                            const url = attachment.url;
                            const file = fileFormat(url);

                            return <Box key={index} >
                                <a href={url} target="_blank" download style={{
                                    color: "black"
                                }} > {RenderAttachment(file, url)} </a>
                            </Box>
                        })
                    )
                }

                <Typography fontSize={12} color="text.secondary"
                    sx={{
                        textAlign: sameSender ? "end" : "start"
                    }}> {timeAgo} </Typography>

            </div>

        </div>
    )
}

export default memo(MessageComponent);