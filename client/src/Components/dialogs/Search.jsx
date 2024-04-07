import { useInputValidation } from "6pp";
import { Search as SearchIcon } from '@mui/icons-material';
import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from "@mui/material";
import React, { useState } from 'react';
import { sampleUsers } from '../Constans/SampleData';
import UserItem from '../Shared/UserItem';


const Search = () => {

    const search = useInputValidation("");

    let isLoadingSendFriendRequest = false;

    const [users, setUsers] = useState(sampleUsers)

    const addFriendHandler = (id) => {
        console.log(id);
    }

    return (
        <Dialog open>
            <Stack p={"2rem"} direction={"column"} width={"25rem"}>
                <DialogTitle textAlign={"center"}>Search Prople</DialogTitle>

                <TextField
                    id=""
                    label=""
                    value={search.value}
                    onChange={search.changeHandler}
                    variant="outlined"
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                <List  >
                    {
                        users.map((user, index) => (
                            <UserItem user={user} key={user._id} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriendRequest} />
                        ))
                    }
                </List>

            </Stack>
        </Dialog>
    )
}

export default Search