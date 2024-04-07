import { useInputValidation } from "6pp";
import { Button, Dialog, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from 'react';
import { sampleUsers as users } from "../Constans/SampleData";
import UserItem from '../Shared/UserItem';

const NewGroup = () => {

    const groupName = useInputValidation("");


    const [members, setMembers] = useState(users);
    const [selectedMembers, setSelectedMembers] = useState([]);

    const selectMemberHandler = (_id) => {

        // setMembers(prev => prev.map((user) => user._id === _id? {...user,isAdded: !user.isAdded} : user)) 

        setSelectedMembers(prev => prev.includes(_id) ? prev.filter((currentElement) => currentElement !== _id) : [...prev, _id]);
    }
    console.log(selectedMembers);

    const submitHandler = () => {

    }

    const closeHandler = () => {

    }


    return (
        <Dialog open onClose={closeHandler}>
            <Stack p={{ xs: "1rem", sm: "3rem" }} direction={"column"} width={"28rem"} spacing={"2rem"}>
                <DialogTitle variant="h4" textAlign={"center"} width={"100%"} >New Group</DialogTitle>


                <TextField
                    id=""
                    label="Group Name"
                    variant="outlined"
                    size="medium"
                    value={groupName.value}
                    onChange={groupName.changeHandler}
                />

                <Typography variant="body1" color="initial" textAlign={"center"}>Members</Typography>

                <Stack >
                    {
                        members.map((user, index) => (
                            <UserItem user={user} key={user._id} handler={selectMemberHandler} isAdded={selectedMembers.includes(user._id)} />
                        ))
                    }
                </Stack>

                <Stack direction={"row"} justifyContent={"space-between"} m={2} >
                    <Button variant="text" color="error">
                        Cancel
                    </Button>

                    <Button color="success" variant="contained" onClick={submitHandler}>
                        Create
                    </Button>
                </Stack>

            </Stack>
        </Dialog>

    )
}

export default NewGroup