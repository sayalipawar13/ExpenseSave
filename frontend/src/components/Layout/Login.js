import React from 'react';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

function Login(){
return(

    <div style={{display:"flex",textAlign:"center",justifyContent:"center",flexDirection:"column", marginTop:200}}>
         <img src="images/logo.png" style={{width:"80px",margin:"auto"}} alt="Expense Tracker" />
<Typography variant="h4" >
    ExpenseSave</Typography>
<br/>
<div><Button variant='contained' color='secondary' href='http://localhost:5000/auth/google'>Sign in with google</Button></div>
</div>

)
}

export default Login;
