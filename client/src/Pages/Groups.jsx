import React, { Suspense, lazy, memo, useEffect, useState } from 'react'
import { Grid, IconButton, Tooltip, Box, Drawer, Stack, Typography, TextField, Button, Backdrop } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../Components/Styles/StyledComponents";
import AvatarCard from '../Components/Shared/AvatarCard';
import { sampleChats, sampleUsers } from '../Components/Constans/SampleData';
import UserItem from '../Components/Shared/UserItem';
import GroupImage from "../assets/homebg6.jpeg";

const ConfirmDelteDialog = lazy(() => import("../Components/dialogs/ConfirmDeleteDialog"));
const AddMemberDialog = lazy(() => import("../Components/dialogs/AddMemberDialog"));

const isAddMember = false;

const Groups = () => {

  const chatId = useSearchParams()[0].get("group");

  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdated, setGroupNameUpdated] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)

  const navigateBack = () => { navigate("/") };

  const handleMobile = () => { setIsMobileMenuOpen((prev) => !prev) }

  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
    console.log("Delete Group");
  };

  const closeConfirmDelteHandler = () => {
    setConfirmDeleteDialog(false)
  }

  const openAddMemberHandler = () => { console.log("Add Members"); }

  const deleteHandler = () => {
    console.log("Delete Handler");
    closeConfirmDelteHandler();
  }

  const removeMemberHandler = (id) => { console.log("Remove Member ", id); }

  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdated(`Group Name ${chatId}`);
    }
    return () => {
      setGroupName("");
      setGroupNameUpdated("");
      setIsEdit(false);
    }
  }, [chatId])


  const IconBtns = <>
    <Box sx={{
      display: {
        xs: "block", sm: "none",
        position: "fixed",
        right: "2rem",
        top: "2rem"
      },
    }}>
      <IconButton onClick={handleMobile} >
        <MenuIcon />
      </IconButton>
    </Box>

    <Tooltip title="back">
      <IconButton aria-label="" sx={{
        position: "absolute",
        top: "2rem",
        left: "2rem",
        color: "white",
        bgcolor: "#1c1c1c",
        ":hover": {
          bgcolor: "rgba(0,0,0,0.4)"
        }
      }} onClick={navigateBack}
      >
        <KeyboardBackspaceIcon />
      </IconButton>
    </Tooltip>
  </>;

  const updateGroupName = () => { setIsEdit(false); console.log("Update Group Name", groupName); }

  return (
    <Grid container height={"100vh"} sx={{
      padding: "1rem",
      gap: 2,
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: `url(${GroupImage})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }} >
      <Grid item sm={3}
        sx={{
          display: { xs: "none", sm: "block" },
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          borderRadius: "16px",
          backdropFilter: "blur(5.2px)",
          bgcolor: "rgba(233, 233, 233, 0.25)"
        }}
      >
        <GroupsList myGroups={sampleChats} chatId={chatId} />
      </Grid>

      <Grid item height={"90%"} xs={12} sm={8} sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        padding: "1rem 3rem",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        borderRadius: "16px",
        backdropFilter: "blur(5.2px)",
        bgcolor: "rgba(233, 233, 233, 0.25)"
      }} >
        {IconBtns}

        {/* groupName */}
        {
          groupName && (
            <>
              <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} padding={"1rem"} >
                {
                  isEdit ? <>
                    <TextField value={groupNameUpdated} onChange={e => setGroupNameUpdated(e.target.value)} sx={{ input: { color: 'white' } }} />
                    <IconButton onClick={updateGroupName}>
                      <DoneIcon sx={{ color: "white" }} />
                    </IconButton>
                  </> : <>
                    <Typography variant="h5" color="white"  >
                      {groupName}
                    </Typography>

                    {groupName && <IconButton onClick={() => setIsEdit(true)}>
                      <EditIcon sx={{ color: "white" }} />
                    </IconButton>}
                  </>
                }
              </Stack>

              <Typography margin={"2rem"} textAlign={"center"} variant="5" color="white">Members</Typography>

              {/* Members */}
              <Stack
                maxWidth={"45rem"}
                width={"100%"}
                boxSizing={"border-box"}
                padding={{
                  xs: "0",
                  sm: "1rem",
                  md: "1rem 4rem"
                }}
                spacing={"2rem"}
                height={"50vh"}
                overflow={"auto"}
              >
                {
                  sampleUsers.map((i) => (
                    <UserItem user={i} isAdded key={i._id} styling={{
                      boxShadow: "2px 5px 0.7rem rgba(0,0,0,1)",
                      padding: "1rem 2rem",
                      borderRadius: "1rem",
                      bgcolor: "white"
                    }} handler={removeMemberHandler} />
                  ))
                }
              </Stack>

              {/* ButtonGroup */}
              <Stack
                direction={{
                  xs: "column-reverse",
                  sm: "row"
                }}
                spacing={"1rem"}
                padding={{
                  xs: "0",
                  sm: "1rem",
                  md: "1rem 4rem"
                }}
              >
                <Button size="large" variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={openConfirmDeleteHandler} >Delete Group</Button>
                <Button size="large" variant="contained" startIcon={<AddIcon />} onClick={openAddMemberHandler} >Add Member</Button>
              </Stack>
            </>

          )
        }


      </Grid>

      {
        isAddMember && <Suspense fallback={<Backdrop open />} >
          <AddMemberDialog />
        </Suspense>
      }

      {
        confirmDeleteDialog && <Suspense fallback={<Backdrop open />} >
          <ConfirmDelteDialog open={confirmDeleteDialog} handleClose={closeConfirmDelteHandler} deleteHandler={deleteHandler} />
        </Suspense>
      }

      <Drawer
        variant="temporary"
        anchor="left"
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
        sx={{
          display: { xs: "block", sm: "none" }
        }}
      >
        <GroupsList w={"50vw"} myGroups={sampleChats} chatId={chatId} />
      </Drawer>

    </Grid>
  )
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w} sx={{
    height: "100%",
    overflow: "auto",
  }}>
    {myGroups.length > 0 ? myGroups.map((group) => <GroupListItem group={group} chatId={chatId} key={group._id} />
    ) : (
      <Typography textAlign={"center"} padding={"1rem"} >
        No Groups
      </Typography>)}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return <Link to={`?group=${_id}`} onClick={(e) => {
    if (chatId === _id) e.preventDefault();
  }} >
    <Stack direction={"row"} spacing={"1rem"} alignItems={"center"} padding={"1rem"} >
      <AvatarCard avatar={avatar} />
      <Typography color={"white"} > {name} </Typography>
    </Stack>
  </Link>
})

export default Groups