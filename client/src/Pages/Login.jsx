import React, { useState } from 'react'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Container from '@mui/material/Container'
import { Avatar, Button, IconButton, Input, Paper, Stack, TextField, Typography } from '@mui/material'
import { VisuallyHiddenInput } from '../Components/Styles/StyledComponents';
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp"
import { usernameValidator } from '../Utils/UnameValidater';

const Login = () => {

    const [isLogin, setIsLogin] = useState(true);

    const name = useInputValidation("");
    const username = useInputValidation("", usernameValidator);
    const password = useInputValidation("");
    const avatar = useFileHandler("single", 2);
    // const name = useInputValidation("");

    const handleSignup = (e) => {
        e.preventDefault();
    }

    const handleLogin = (e) => {
        e.preventDefault();
    }

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

                        {isLogin ?
                            <>
                                <Typography variant="h5" color={"black"}>
                                    Login
                                </Typography>
                                <form onSubmit={handleLogin}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Username"
                                        margin="normal"
                                        variant="outlined"
                                        value={username.value}
                                        onChange={username.changeHandler}
                                    />

                                    <TextField
                                        required
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        margin="normal"
                                        variant="outlined"
                                        value={password.value}
                                        onChange={password.changeHandler}
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

                                    <Typography textAlign={"center"} m={"1rem"}>OR</Typography>

                                    <Button
                                        fullWidth
                                        variant="text"
                                        onClick={() => setIsLogin(!isLogin)}
                                    >
                                        Sign Up Here
                                    </Button>

                                </form>
                            </> :

                            <>
                                <Typography variant="h5">
                                    Sign Up
                                </Typography>

                                <form onSubmit={handleSignup}>

                                    <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                                        <Avatar sx={{
                                            width: "10rem",
                                            height: "10rem",
                                            objectFit: "contain",
                                        }}
                                            src={avatar.preview}
                                        />

                                        <IconButton sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            right: 0
                                        }} component="label">
                                            <>
                                                <CameraAltIcon />
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    accept=".png, .jpg"
                                                    onChange={avatar.changeHandler}
                                                />
                                            </>
                                        </IconButton>

                                    </Stack>

                                    {avatar.error && (
                                        <Typography
                                            m={"1rem auto"}
                                            width={"fit-content"}
                                            display={"block"}
                                            color="error"
                                            variant="caption">

                                            {avatar.error}
                                        </Typography>
                                    )}

                                    <TextField
                                        required
                                        fullWidth
                                        label="Name"
                                        margin="normal"
                                        variant="outlined"
                                        value={name.value}
                                        onChange={name.changeHandler}
                                    />

                                    <TextField
                                        required
                                        fullWidth
                                        label="Username"
                                        margin="normal"
                                        variant="outlined"
                                        value={username.value}
                                        onChange={username.changeHandler}
                                    />

                                    {username.error && (
                                        <Typography color="error" variant="caption">
                                            {username.error}
                                        </Typography>
                                    )}

                                    <TextField
                                        required
                                        fullWidth
                                        label="Email"
                                        margin="normal"
                                        variant="outlined"
                                        type="email"
                                    />

                                    <TextField
                                        required
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        margin="normal"
                                        variant="outlined"
                                        value={password.value}
                                        onChange={password.changeHandler}
                                    />

                                    {password.error && (
                                        <Typography color="error" variant="caption">
                                            {password.error}
                                        </Typography>
                                    )}

                                    <Button sx={{ marginTop: "1rem" }
                                    }
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        fullWidth
                                    >
                                        Sign Up
                                    </Button>

                                    <Typography textAlign={"center"} m={"1rem"}>OR</Typography>

                                    <Button
                                        fullWidth
                                        variant="text"
                                        onClick={() => setIsLogin(!isLogin)}
                                    >
                                        Login Here
                                    </Button>
                                </form>
                            </>}

                    </Paper>
                </Container>
            </Container>
        </div >


    )
}

export default Login