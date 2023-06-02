import React, { useContext, useEffect } from "react";
import { Typography,Box,Drawer, Toolbar, Divider, Button,IconButton} from "@mui/material";
import { useNavigate} from "react-router";
import { useState } from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import GlobalContext from "../context/GlobalContext";
import Cookies from 'js-cookie';
import Axios from "./AxiosInstance";
const drawerWidth=300;

export default function Nav(){
  const {user, setUser} = useContext(GlobalContext);
  
  console.log(user);

  
    const [mobileOpen, setMobileOpen] = React.useState(false);
    useEffect(() => {
      // TODO: Implement get user
      const userToken = Cookies.get('UserToken');
      // console.log(userToken);
      if (userToken == null || userToken == "undefined") return;
      // 1. check if cookie is set
      // 2. send a request to server
      Axios.get("/me", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }).then((res) => {
        console.log(res.data.user.username);
        // 3. if success, set user information
        setUser({
          username: res.data.user.username,
          email: res.data.user.email,
        });
      });
    }, []);
    console.log(user);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      };
    
    const textstyle={
        fontFamily: 'Work Sans',
        fontWeight: 100,
        fontSize: 15,
        color:'#EFF2F1',
        padding: '6px',
        
      };
    const navigate=useNavigate();
    const [activeTab,setActiveTab]=useState('');
    const handleClick=(tab)=>{
        setActiveTab(tab);
        navigate(`/${tab}`);
    }
    const handleLogout=()=>{
        Cookies.remove('UserToken');
        navigate('/');
    }
    
    return(
    <Box sx={{ display: 'flex' }}>
     
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
        <Drawer
          open={mobileOpen}
          onClose={handleDrawerToggle}
          
          sx={{
            width: drawerWidth,
           
          }}
        >
          <div style={{
                width:drawerWidth,
                height: '100%',
                background: '#474773',
                }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <IconButton onClick={handleDrawerToggle}>
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
                <div style={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center'
        }}>
            <img style={{paddingTop:'15px',
                        borderRadius:'50%',
                        margin:0,
                        width:'175px',
                        height:'175px'}} src="assets/profile.jpg"></img>
           </div>
           <Typography sx={{
             fontFamily:'Work Sans',
             paddingTop: '15px',
             fontSize: '1.2rem',
             fontWeight:'300',
             color: '#EFF2F1',
             textAlign:'center'
           }}>
            {user !== undefined && user.username}
           </Typography>
           <nav position='static'>
            <Toolbar style={{padding:0,margin:0}}>
                <Box>
                <ul style={{margin:0,
                            padding:0}}>
                        <li style={{listStyleType:'none'}}>
                        <Button sx={{alignItems:'center'}} onClick={() => handleClick('home')}>
                        <DashboardIcon sx={{display: "flex", color: '#EFF2F1'}}/>
                        <Typography variant='h7'
                        component='div'
                            sx={textstyle}>
                                Home
                         </Typography>
                        </Button>
                        </li>
                        <li style={{listStyleType:'none'}}>
                        <Button sx={{alignItems:'center'}} onClick={handleLogout}>
                        <LogoutIcon sx={{display: "flex", color: '#EFF2F1'}}/>
                        <Typography variant='h7'
                        component='div'
                            sx={textstyle}>
                            Logout
                         </Typography>
                        </Button>
                        </li>
                    </ul>
                
                </Box>
            </Toolbar>
           </nav>
        </div>
        </Drawer>
        </Box>
        </Box>
    );
}