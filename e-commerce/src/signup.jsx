import axios from "axios";
import { useRecoilValue, useSetRecoilState,atom} from "recoil"
import Button from '@mui/material/Button';
import { Card,TextField,Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Landingbar from "./Landingbar";
const RegisuserName = atom({
    key :"username",
    default:""
  })
const Regispassword = atom({
    key:"userNameRegister",
    default:""
 })
const Signup =()=>{
    const Navigate = useNavigate();
    const userName = useRecoilValue(RegisuserName);
    const setuserName = useSetRecoilState(RegisuserName);
    const password = useRecoilValue(Regispassword);
    const setPassword = useSetRecoilState(Regispassword);
    const handleClick = async()=>{
      try{
        const res = await axios.post("http://localhost:3000/user/signup",{
          username:userName,
          password:password
        })
        if(res.data.message=="Input error"){
          alert("password minimum 8 characters");
        }
        else{
          localStorage.setItem('Token',res.data.token);
          setPassword("");
          setuserName("");
          Navigate("/items");

        }
      }
      catch{
        alert("user already exists")
      }
    }
    return(
        <>
        <Landingbar></Landingbar>
        <Typography variant="h6" component="h2"style={{ textAlign: 'center'}}>
  Welcome to Shopping Cart 
</Typography>
           <div
   style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  }}
>

<Card variant="outlined" style={{ padding: '20px', width: '300px',height:'250px'}}>
<Typography variant="h6" component="h2"style={{ textAlign: 'center'}}>
  Signup
</Typography>

       <TextField id="outlined-basic" label="username" variant="outlined" style={{ marginBottom: '16px',width:'250px' }} onChange={(e)=>setuserName(e.target.value)} value={userName}/>
       <br>
       {console.log("inside")}
       </br>
       <TextField id="outlined-basic" label="password" variant="outlined" style={{ marginBottom: '16px',width:'250px' }}onChange={(e)=>setPassword(e.target.value)} value={password}/>
       <br></br>
       {/* <button type='submit'
       onClick={()=>handleClick()}
       >Signin</button> */}
       <Button variant="contained"
        onClick={()=>handleClick()}>signin</Button>
        </Card>
      </div>
        </>
    )
    
}
export default Signup;
