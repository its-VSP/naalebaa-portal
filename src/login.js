import './App.css';
import { useParams, Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

/* Basically all the logins will be powered by MOI ID(https://identity.moi.technology) */
function Login() {
    const [loginInProgress, setLoginInProgress] = React.useState(true);
    const [userTypeName, setUserTypeName] = React.useState();
    const { userType } = useParams();

    
    React.useEffect(() => {
        window.currentUserType = userType;
        setUserTypeName(userType === "buyer" ? "Buyer" : userType === "seller" ? "Seller" : "Government Officier");
        setTimeout(() => {
            setLoginInProgress(false)
        }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <>
        { 
            loginInProgress 
            ? 
            <div style={{ display: 'flex', flexDirection: 'column', alignItems:'center'}}>
                <CircularProgress size={36} style={{ marginLeft: "6px" }} color="inherit" />
                Login as {userTypeName} in Progress
            </div>
            : 
            <Navigate to={"/myProperties"} />
        }
        
    </>
  );
}
export default Login;