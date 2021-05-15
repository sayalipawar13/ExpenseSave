import React from 'react';

const Loading=()=>{
    return(
<div style={{display:"flex",textAlign:"center",justifyContent:"center",flexDirection:"column", marginTop:250}}>
<img src="images/wallet_gif.gif" alt="Loading..." style={{width:"100px",margin:"auto"}} />
{/* <div style={{fontSize:"20px"}}>Loading ...</div> */}
</div>
    );
}

export default Loading;
