import { Avatar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { dashboradData } from "../../Components/Constans/SampleData";
import AdminLayout from '../../Components/layout/AdminLayout';
import AvatarCard from "../../Components/Shared/AvatarCard";
import Table from '../../Components/Shared/Table';
import { transformImage } from "../../lib/Features";


const columns = [
    {
        field: 'id',
        headerName: 'ID',
        headerClassName: "table-header",
        width: 200
    },
    {
        field: 'avatar',
        headerName: 'Avatar',
        headerClassName: "table-header",
        width: 150,
        renderCell: (params) => <AvatarCard avatar={params.row.avatar} />
    },
    {
        field: 'name',
        headerName: 'Name',
        headerClassName: "table-header",
        width: 300
    },
    {
        field: 'totalMembers',
        headerName: 'Total Members',
        headerClassName: "table-header",
        width: 120
    },
    {
        field: 'members',
        headerName: 'Members',
        headerClassName: "table-header",
        width: 400,

        renderCell: (params) => <AvatarCard max={100} avatar={params.row.members} />
    },
    {
        field: 'totalMessages',
        headerName: 'Total Messages',
        headerClassName: "table-header",
        width: 120
    },
    {
        field: 'creator',
        headerName: 'Created By',
        headerClassName: "table-header",
        width: 250,
        renderCell: (params) => (
            <Stack direction="row" alignItems="center" spacing={"1rem"}>
                <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
                <span>{params.row.creator.name}</span>
            </Stack>
        )
    },
]

const ChatManagment = () => {

    const [rows, setRows] = useState([]);

    useEffect(() => {
        setRows(dashboradData.chats.map((chat) => ({
            ...chat,
            id: chat._id,
            avatar: chat.avatar.map((avatar) => transformImage(avatar, 50)),
            members: chat.members.map((member) => transformImage(member.avatar, 50)),
            creator: {
                name: chat.creator.name,
                avatar: transformImage(chat.creator.avatar, 50)
            }
        })))
    }, [])


    return (
        <AdminLayout >
            <Table heading="All Chats" columns={columns} rows={rows} />
        </AdminLayout>
    )
}


export default ChatManagment