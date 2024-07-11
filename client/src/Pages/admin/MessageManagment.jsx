import React, { useEffect, useState } from 'react'
import AdminLayout from '../../Components/layout/AdminLayout'
import Table from "../../Components/Shared/Table";
import { dashboradData } from '../../Components/Constans/SampleData';
import { fileFormat, transformImage } from "../../lib/Features";
import moment from 'moment';
import { Avatar, Box, Stack } from '@mui/material';
import RenderAttachment from "../../Components/Shared/RenderAttachment";


const columns = [
    {
        field: 'id',
        headerName: 'ID',
        headerClassName: "table-header",
        width: 200
    },
    {
        field: 'attachments',
        headerName: 'Attachments',
        headerClassName: "table-header",
        width: 200,
        renderCell: (params) => {

            const { attachments } = params.row;

            return attachments?.length > 0 ? attachments.map(i => {

                const url = i.url;
                const file = fileFormat(url);

                return <Box >
                    <a href={url}
                        target="_blank"
                        download
                        style={{
                            color: "black",
                        }}
                    > {RenderAttachment(file, url)} </a>
                </Box>
            }) : "No Attachments"
        }
    },
    {
        field: 'contest',
        headerName: 'Content',
        headerClassName: "table-header",
        width: 400
    },
    {
        field: 'sender',
        headerName: 'Sent By',
        headerClassName: "table-header",
        width: 200,
        renderCell: (params) => (
            <Stack >
                <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
                <span>{params.row.sender.name}</span>
            </Stack>
        )
    },
    {
        field: 'chat',
        headerName: 'Chat',
        headerClassName: "table-header",
        width: 220
    },
    {
        field: 'groupChat',
        headerName: 'Group Chat',
        headerClassName: "table-header",
        width: 100
    },
    {
        field: 'createdAt',
        headerName: 'Time',
        headerClassName: "table-header",
        width: 250
    },
]
const MessageManagment = () => {

    const [rows, setRows] = useState([]);

    useEffect(() => {

        setRows(dashboradData.messages.map((message) => ({
            ...message,
            id: message._id,
            sender: {
                avatar: transformImage(message.sender.avatar, 50),
                name: message.sender.name,
            },
            createdAt: moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
        })))
    })

    return (
        <AdminLayout >
            <Table heading="All Messages" columns={columns} rows={rows} rowHeight={200} />
        </AdminLayout>
    )
}

export default MessageManagment