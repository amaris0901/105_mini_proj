import { useEffect, useState, useContext } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import GlobalContext from '../context/globalContext';
import Axios from './AxiosInstance';


const PostEditModal = ({ post = {}, open = false, handleClose = () => {}, setPost = () => {} }) => {
  const [newPost, setNewPost] = useState(post);
  const [error, setError] = useState({});
  const { user, setStatus } = useContext(GlobalContext);
  const validateForm=()=>{
    const error={};
    if(!newPost.title) error.title='Title is required';
    if(!newPost.description) error.description='Description is required';
    setError(error);
    if(Object.keys(error).length) return false;
    return true;
  }
  useEffect(() => {
    setNewPost(post);
  }, [post]);

  const submit = async () => {
    if (!validateForm()) return;
    try{
      const userToken=Cookies.get('UserToken');
      const response=await Axios.patch(
        '/post',
        {
          title: newPost.title,
          description: newPost.description,
          postId: newPost.postId,
        },
        {
          headers: {Authorization: `Bearer ${userToken}`},
        }
      );
      if(response.data.success){
        setStatus({severity: 'success', msg:'Update post successfully'});
        console.log(response.data)
        setPost(newPost);
          resetAndClose();
      }
    } catch (error){
      if(error instanceof AxiosError && error.response){
        setStatus({severity: 'error', msg: error.response.data.error});
      } else{
        setStatus({severity:'error', msg: error.message});
      }
    }
    
  };

  const resetAndClose = () => {
    setTimeout(() => {
      setNewPost(post);
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
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <TextField
          required
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
          required
          multiline
          margin="dense"
          id="description"
          name="description"
          label="Description"
          placeholder="Write your posts here..."
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
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostEditModal;