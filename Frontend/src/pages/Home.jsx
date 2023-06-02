import { Box, Typography, Grid} from '@mui/material'
import React,{useState,useContext,useEffect} from 'react'
import Nav from '../components/Nav'
import PostCreateModal from '../components/PostCreateModal'
import Postcard from '../components/Postcard'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import GlobalContext from '../context/GlobalContext'
import Cookies from 'js-cookie'
import Axios from '../components/AxiosInstance'
function Home() {
    const [posts, setPosts] = useState([]);
    const [openCreate,setOpenCreate]=useState(false);
    const {user, setStatus} = useContext(GlobalContext);
    const handlePostCreateOpen=()=>{
        setOpenCreate(true);
    }
    const handlePostCreateClose=()=>{
        setOpenCreate(false);
    }
useEffect(()=>{
    const userToken = Cookies.get('UserToken');
    if(userToken !== undefined && userToken !== 'undefined') {
        Axios.get('/postsByUser', { headers: { Authorization: `Bearer ${userToken}`}})
        .then((res)=>{
            setPosts(res.data.data);
        });
    }
},[user]);
const handleDelete = async (id) => {
    try {
      const userToken = Cookies.get('UserToken');
      const response = await Axios.delete(`/post/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      if (response.data.success) {
        // TODO: show status of success here
        console.log(posts)
        const newPosts = posts.filter((p)=>p.id !== id)
        console.log(id,
            newPosts
        );
        setPosts(newPosts)
        setStatus({severity:'success', msg:'Delete post successfully'})
        // navigate(-1);
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        // TODO: show status of error from AxiosError here
        setStatus({severity:'error', msg:error.response.data.error});
      } else {
        // TODO: show status of other errors here
        setStatus({severity:'error',msg: error.message});
      }
    }
  };
  return (
    <Box>
      <Nav/>
      <Box sx={{ height: "40%", mb: 2 }}>
      <Typography sx={{textAlign:'center',fontFamily: 'Courgette',
              fontWeight: 300,
              fontSize: 30,
              color: '#474773',}}>
                Welcome Back!
               </Typography>
               <Typography sx={{textAlign:'center',fontFamily: 'Courgette',
              fontWeight: 300,
              fontSize: 15,
              color: '#474773',}}>
                Start recording your thoughts for the day...
               </Typography>
               {posts.map((post,index)=>(
                <Grid item xs={12}mkey={index}>
                  <Postcard
                  postId={post.id}
                  title={post.title}
                  description={post.description}
                  handleDelete={handleDelete}
                  />
                </Grid>
               ))}
               <Box sx={{ '& > :not(style)': { m: 1 } , position: 'absolute',
                bottom: 16,
                right: 16,}}>
                <Fab  color="white" aria-label="add" sx={{color:"#474773"}}
                onClick={handlePostCreateOpen}
              >
                <AddIcon/>
                </Fab>
                <PostCreateModal open={openCreate} handleClose={handlePostCreateClose} post={posts} setPosts={setPosts} />
               </Box>
               </Box>
    </Box>
  )
}

export default Home