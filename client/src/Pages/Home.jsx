import React from 'react'
import { Container } from '@mui/material'

const Home = () => {
    return (
        <Container sx={{
            height: "100vh",
            display: 'flex',
            justifyItems: 'center',
            alignItems: 'center',
            padding: "5px",
            border: "5px solid black"
        }} maxWidth>
            <Container>Hello</Container>
        </Container>
    )
}

export default Home