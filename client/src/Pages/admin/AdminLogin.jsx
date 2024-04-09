import React, { useState } from 'react'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Container, Paper, TextField, Typography, Avatar, Button, IconButton, Input, Stack } from '@mui/material';
import { Navigate } from 'react-router-dom'
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";

const isAdmin = true;

const AdminLogin = () => {

    const secretKey = useInputValidation();

    const [isLogin, setIsLogin] = useState(true);

    const submitHandler = (e) => {
        e.preventDefault();
    }

    if (isAdmin) return <Navigate to="/admin/dashboard" />

    return (
        <div style={{
            backgroundImage: "linear-gradient(to top, #6785b1, #50a7c6, #5cc7c6, #96e2b8, #e0f6ae)"
        }}>
            <Container sx={{
                height: "100vh",
                display: 'flex',
                justifyItems: 'center',
                alignItems: 'center',
            }}>
                <Container component={"main"} maxWidth="xs">
                    <Paper elevation={6} sx={{
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backdropFilter: "blur(16px)",
                        bgcolor: "rgba(255, 255, 255, 0.4)",
                        borderRadius: 7
                    }} >

                        <Typography variant="h5" color={"black"}>
                            Admin Login
                        </Typography>
                        <form onSubmit={submitHandler}>

                            <TextField
                                required
                                fullWidth
                                label="Secret Key"
                                type="password"
                                margin="normal"
                                variant="outlined"
                                value={secretKey.value}
                                onChange={secretKey.changeHandler}
                            />

                            <Button sx={{ marginTop: "1rem" }
                            }
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                            >
                                Login
                            </Button>

                        </form>

                    </Paper>
                </Container>
            </Container>
        </div >
    )
}

export default AdminLogin