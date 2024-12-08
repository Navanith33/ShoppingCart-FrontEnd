import Button from '@mui/material/Button';
import {Card,TextField,Typography} from '@mui/material';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState,atom } from 'recoil';
import { useNavigate } from 'react-router-dom';
const userName = atom({
  key :"username",
  default:""
})
const userPassword = atom({
  key :"userPassword",
  default:""
})
const Login=()=>{
  const Navigate = useNavigate();
  const name = useRecoilValue(userName)
  const setName =useSetRecoilState(userName);
  const password = useRecoilValue(userPassword)
  const setPassword=useSetRecoilState(userPassword);
  const handleClick= async () =>{
    try{
    const res = await axios.post("http://localhost:3000/user/login",{
            username:name,
            password:password
        })
    if(res.data.message=="Input error"){
         alert("password minimum 8 characters")
    }
    else{
      localStorage.setItem("Token",res.data.token);
      setName('');
      setPassword('');
      Navigate("/items")
    }
  
    }
    catch(error){
      alert("user doesn't exist"); 
    }
    
  }
  return (
    <>
      <div
   style={{
    display: 'flex', // Enable Flexbox layout
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    height: '100vh' // Full viewport height
  }}
>

<Card variant="outlined" style={{ padding: '20px', width: '300px',height:'250px'
}}>
<Typography variant="h6" component="h2"style={{ textAlign: 'center'}}>
  Login
</Typography>

       <TextField id="outlined-basic" label="username" variant="outlined" style={{ marginBottom: '16px',width:'250px' }} onChange={(e)=>setName(e.target.value)}value={name}/>
       <br>
       </br>
       <TextField id="outlined-basic" label="password" variant="outlined" style={{ marginBottom: '16px',width:'250px' }}onChange={(e)=>setPassword(e.target.value)}value={password}/>
       <br></br>
       <Button variant="contained"
        onClick={()=>handleClick()}>Login</Button>
        </Card>
        {/* {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}  */}
      </div>
    </>
  )
}

export default Login;
