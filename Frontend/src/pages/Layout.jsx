import { CssBaseline, Box, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { Outlet } from "react-router";
import SnackBarMessage from "../components/SnackBarMessage";
import GlobalContext from "../context/globalContext";

export default function Layout(){
    const [user, setUser] = useState();
    const [status, setStatus] = useState("");
    const generatekey = () => {
        return Math.random();
      };

    const globalContextValue = useMemo(()=>{
        return {
          user,
          status,
          setUser,
          setStatus,  
        };
    },[user]);

    return(
        <GlobalContext.Provider value={globalContextValue}>
          <Box sx={{
            minHeight: '100vh',
            background: '#DFDFF2',
          }}
          >
            
            
                <CssBaseline>
                <Outlet/>
                </CssBaseline>
                {status ? (
        <SnackBarMessage key={generatekey()} open={status.open} severity={status.severity} message={status.msg} />
      ) : null}

</Box>
        </GlobalContext.Provider>    
    )
   
}