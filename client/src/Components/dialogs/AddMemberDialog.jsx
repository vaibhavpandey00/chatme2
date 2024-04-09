import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { sampleUsers } from "../Constans/SampleData";
import UserItem from "../Shared/UserItem";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {

    const [members, setMembers] = useState(sampleUsers);
    const [selectedMembers, setSelectedMembers] = useState([]);

    const selectMemberHandler = (_id) => {

        // setMembers(prev => prev.map((user) => user._id === _id? {...user,isAdded: !user.isAdded} : user)) 

        setSelectedMembers(prev => prev.includes(_id) ? prev.filter((currentElement) => currentElement !== _id) : [...prev, _id]);
    }
    console.log(selectedMembers);

    const closeHandler = () => {
        setSelectedMembers([]);
        setMembers([])
    }
    const addMemberSubmitHandler = () => {
        closeHandler();
    }


    return (
        <Dialog open onClose={closeHandler}>
            <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
                <DialogTitle textAlign={"center"} >
                    Add Members
                </DialogTitle>
                <Stack spacing={"1rem"} >
                    {members.length > 0 ?
                        members.map((user) => (<UserItem key={user._id} user={user} handler={selectMemberHandler} isAdded={selectedMembers.includes(user._id)} />)
                        ) :
                        <Typography textAlign={"center"} variant="body1" color="initial">No Members</Typography>
                    }
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Button variant="outlined" color="error" onClick={closeHandler} >Cancel</Button>
                    <Button variant="contained" disabled={isLoadingAddMember} onClick={addMemberSubmitHandler} >Save</Button>
                </Stack>
            </Stack>


        </Dialog>
    )
}

export default AddMemberDialog