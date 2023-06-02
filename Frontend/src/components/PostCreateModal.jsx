import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import React, { useContext, useState } from 'react'
import GlobalContext from '../context/globalContext';
import Axios from './AxiosInstance';

function PostCreateModal({open=false,post=()=>{},handleClose=()=>{},setPosts=() => {}}) {
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
      });
      const [error, setError] = useState({});
      const { setStatus } = useContext(GlobalContext);
    
    const validateForm=()=>{
        const error={};
        if(!newPost.title) error.title='Title is required';
        if(!newPost.description) error.description='Description is required';setError(error);
        if(Object.keys(error).length) return false;
        return true;
      }
      const submit = async () =>  {
        if(!validateForm()) return;
        try{
          const userToken = Cookies.get('UserToken');
          const response = await Axios.post('/post', newPost, {
            headers: { Authorization: `Bearer ${userToken}`},
          })
          if(response.data.success){
            setPosts((prev) => [...prev, response.data.data]);
            resetAndClose();
          }
        } catch (error) {
          if(error instanceof AxiosError && error.response) {
            setStatus({severity:'error', msg:error.response.data.error});
      } else {
        // TODO: show status of other errors here
        setStatus({severity:'error',msg: error.message});
      }
        }
     
      };
      const resetAndClose = () => {
        setTimeout(() => {
          setNewPost({
            title: '',
            description: '',
          });
          setError({});
        }, 500);
        handleClose();
      };
      const handleChange = (e) => {
        setNewPost({
          ...newPost,
          [e.target.name]: e.target.value,
        });
      };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={resetAndClose}>
      <DialogTitle>Create Post</DialogTitle>
      <DialogContent>
      <TextField
          
          margin="dense"
          id="title"
          name="title"
          label="Title"
          fullWidth
          variant="outlined"
          value={newPost.title}
          onChange={handleChange}
          error={!!error.title}
          helperText={error.title}
          
        />
        <TextField
          
          multiline
          margin="dense"
          id="description"
          name="description"
          label="Description"
          placeholder="Write your post here..."
          fullWidth
          value={newPost.description}
          onChange={handleChange}
          error={!!error.description}
          helperText={error.description}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={resetAndClose} color="error" sx={{ textTransform: 'capitalize' }}>
          Cancel
        </Button>
        <Button onClick={submit} type="submit" sx={{ textTransform: 'capitalize' }}>
          Post
        </Button>
      </DialogActions>
      </Dialog>
  )
}

export default PostCreateModal