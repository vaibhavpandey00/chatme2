import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { dashboradData } from "../../Components/Constans/SampleData";
import AdminLayout from '../../Components/layout/AdminLayout';
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
        renderCell: (params) => <Avatar alt={params.row.name} src={params.row.avatar} />
    },
    {
        field: 'name',
        headerName: 'Name',
        headerClassName: "table-header",
        width: 200
    },
    {
        field: 'username',
        headerName: 'Username',
        headerClassName: "table-header",
        width: 200
    },
    {
        field: 'friends',
        headerName: 'Friends',
        headerClassName: "table-header",
        width: 150
    },
    {
        field: 'groups',
        headerName: 'Groups',
        headerClassName: "table-header",
        width: 150
    },
]
const UserManagment = () => {

    const [rows, setRows] = useState([]);

    useEffect(() => {
        setRows(dashboradData.users.map((user) => ({ ...user, id: user._id, avatar: transformImage(user.avatar, 50) })))
    }, [])


    return (
        <AdminLayout >
            <Table heading="All Users" columns={columns} rows={rows} />
        </AdminLayout>
    )
}

export default UserManagment