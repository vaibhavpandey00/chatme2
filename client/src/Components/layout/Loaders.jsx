import React from 'react'
import { Grid, Skeleton, Stack } from '@mui/material'

export const LayoutLoader = () => {
    return (
        <Grid container height={"calc(100vh - 4rem)"} sx={{ alignItems: "center", justifyContent: "center", padding: { md: 4, sm: 2 }, gap: 2, width: "100%", }}>

            <Grid item height={"100%"} sx={{ display: { xs: "none", sm: "block" }, width: { sm: "18rem", md: "20rem", lg: "28rem" }, boxShadow: 3, borderRadius: "20px", bgcolor: "white", p: 1, pt: 2 }}>
                <Stack spacing={1}>
                    {
                        Array.from({ length: 8 }).map((_, index) => (
                            <Skeleton key={index} variant="rounded" height={"5rem"} />
                        ))
                    }
                </Stack>

            </Grid>

            <Grid item height={"100%"} sx={{ boxShadow: 3, borderRadius: "20px", width: { xs: "32rem", md: "32rem", lg: "56.9rem" }, bgcolor: "white", p: 1, }}>
                <Skeleton variant="rounded" height={"48rem"} />
            </Grid>

            <Grid item height={"100%"} sx={{ display: { xs: "none", lg: "block" }, width: { sm: "", md: "", lg: "28rem" }, boxShadow: 3, borderRadius: "20px", bgcolor: "white", p: 1, }}>
                <Stack spacing={2} justifyContent={"center"} alignItems={"center"} height={"48rem"} >
                    <Skeleton variant="circular" width={200} height={200} />
                    <Skeleton variant="rounded" width={"25rem"} height={"32rem"} />
                </Stack>

            </Grid>
        </Grid >
    )
}