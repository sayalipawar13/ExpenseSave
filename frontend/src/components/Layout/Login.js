import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import {GlobalContext} from '../../context/GlobalState';

function Login(){
return(

    <div style={{display:"flex",textAlign:"center",justifyContent:"center",flexDirection:"column", marginTop:150,marginRight:"10%"}}>
         <img src="images/wallet-icon.png" style={{width:"80px",margin:"auto"}} alt="Expense Tracker" />
<Typography variant="h4" >
    ExpenseSave</Typography>
<br/>
<div><Button variant='contained' color='secondary' 
href='http://localhost:5000/auth/google'
>Sign in with google</Button></div>
</div>

)
}

export default Login;
