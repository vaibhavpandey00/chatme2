import React from 'react';
import { Avatar, Dialog, DialogTitle, IconButton, ListItem, Stack, Tooltip, Typography, TextField, Button } from "@mui/material";
import { sampleUsers as users } from "../Constans/SampleData";
import UserItem from '../Shared/UserItem';

const NewGroup = () => {

    const selectMemberHandler = () => {
        console.log(_id);
    }

    return (
        <Dialog open>
            <Stack p={"2rem"} direction={"column"} width={"28rem"} spacing={"2rem"}>
                <DialogTitle variant="h4" textAlign={"center"} width={"100%"} >New Group</DialogTitle>


                <TextField
                  id=""
                  label=""
                  variant="outlined"
                  size="medium"
                  
                />

                <Typography color="initial" textAlign={"center"}>Members</Typography>

                <Stack >
                    {
                        users.map((user, index) => (
                            <UserItem user={user} key={user._id} handler={selectMemberHandler} />
                        ))
                    }
                </Stack>

                <Stack direction={"row"} justifyContent={"space-between"} m={2} >
                    <Button variant="text" color="error">
                        Cancel
                    </Button>

                    <Button color="success" variant="contained">
                        Create
                    </Button>
                </Stack>

            </Stack>
        </Dialog>

    )
}

export default NewGroup