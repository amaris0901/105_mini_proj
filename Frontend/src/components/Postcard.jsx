import { Avatar, Card, CardActionArea, CardActions, CardContent, CardHeader, IconButton, Typography, Button, Box, Grid } from '@mui/material';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import GlobalContext from '../context/globalContext';
import PostEditModal from './PostEditModel';


function Postcard({postId, title='', description ='', date='', handleDelete = (id) => {}}) {
    const[expanded, setExpanded] = useState(false);
    const[commentOpen, setCommentOpen] = useState(false);
    const {user, setStatus} = useContext(GlobalContext);
    const [openEdit, setOpenEdit] = useState(false);

  const [post, setPost] = useState({
    postId: postId,
    title: title,
    description: description,
   
  });

    const handlePostEditOpen = () => {
      setOpenEdit(true);
    };
    const handlePostEditClose = () => {
      setOpenEdit(false);
    };
    const handleEdit = () => {
      handlePostEditOpen();
    };
    useEffect(()=>{
      console.log(post);
    },[]);
  
    return (
       
              <Box sx={{
                display:'flex',
                justifyContent:'center',
                
              }}>
                <Card sx={{width:'60%',
                        fontFamily:'Work Sans',margin:"1% 0"}}>
                  <CardActionArea sx={{bgcolor:'#F5F5F5'}} >
                    <CardHeader
                      avatar={
                        <Avatar aria-label="user_avatar">
                          N
                        </Avatar>
                      }
                      title={user.username}
                    />
                    <CardContent>
                      
                      <Typography variant="h6" component="h1" sx={{fontFamily:'Work Sans'}}>
                        {post.title}
                      </Typography>
                      
                      <Typography variant="body1" component="p" sx={{fontFamily:'Work Sans'}}>
                        {post.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions disableSpacing sx={{ display: 'flex'}}>
                    <IconButton onClick={handlePostEditOpen}  aria-label="edit post" sx={{color:'#4059AD'}}>
                      <ModeEditRoundedIcon />
                    </IconButton>
                    <PostEditModal setPost={setPost} handleEdit={handleEdit} handleClose={handlePostEditClose} open={openEdit} post={post} />

                    <IconButton onClick={()=>handleDelete(post.postId)} aria-label="delete post" sx={{color:'#4059AD'}}>
                      <DeleteRoundedIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }}></Box>
                  </CardActions>
                </Card>

              </Box>
      
      );
    }
    
  

export default Postcard