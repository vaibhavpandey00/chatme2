import React from 'react'
import { Container, Paper, Typography } from '@mui/material'
import { DataGrid } from "@mui/x-data-grid";

const Table = ({rows, columns, heading, rowsHeight = 52}) => {
  return (
    <Container sx={{height: "100vh"}}>
    <Paper 
    elevation={3}
    sx={{
        width: "100%",
        height: "100%",
        padding: "1rem 4rem",
        borderRadius: "1rem",
        margin: "auto",
        overflow: "hidden",
        boxShadow: "none",
    }}
    
    >
        <Typography
        textAlign={"center"}
        variant="h4"
        sx={{
            margin: "2rem",
            textTransform: "uppercase",
        }}
         >{heading}</Typography>

        <DataGrid 
        rows={rows} 
        columns={columns} 
        getRowHeight={() => rowsHeight}
        sx={{
            height: "80%",
            border: "none",
            ".table-header":{
                backgroundColor: "rgba(0,0,0,0.1)",
                color: "white",
                
            }
        }} 
        />
    </Paper>
    </Container>
  )
}

export default Table