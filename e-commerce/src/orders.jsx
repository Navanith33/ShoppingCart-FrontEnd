import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState,atom} from "recoil";
import { Viewitemdetails } from "./items";
import { Button,Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import Appbar from "./Appbar";

const orderAtom = atom({
    key:"cartItems",
    default:[]
})
// export const cartAppbar = atom({
//     key:"cartAppbar",
//     default:""
// })
const Order = () =>{
    const Navigate = useNavigate();
    const orderedItems = useRecoilValue(orderAtom);
    const setorder= useSetRecoilState(orderAtom)
    const [loading,setLoading]= useState(null);
    const Logintoken = localStorage.getItem('Token');
    const handleClick = ()=>{
        Navigate("/items");
    }
useEffect(()=>{
    axios.get("http://localhost:3000/user/ordersHistory",
        {headers:{
            authorization: `Bearer ${Logintoken}`
          }}).then((res)=>{
               setorder(res.data);
               setLoading('');
          })
},[loading])
     if(loading==null){
        return(
            <>
            loading...
            </>
        )
     }
    if(orderedItems=="Never ordered anything"){
        return(
            <>
            <Typography variant="h6" component="h2"style={{ textAlign: 'center'}}>
            You haven’t made any orders yet. Start shopping now!
</Typography>
<br>
</br>  <div style={{ textAlign: 'center'}}>
            <Button variant="contained"style={{ textAlign: 'center'}}
        onClick={()=>handleClick()}>CLick to ADD Items </Button>
        </div>
            </>
        )
    }
    return(
        <>
         <div
      style={{
        display: 'flex',flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px', alignItems: 'center'
      }}>
        {orderedItems.item.map((sinItem) =>{
       return(
         <div>
            <Viewitemdetails sinitem={sinItem}/>
          </div>
          
          )
        }
      )
    }
    </div>
  
        </>
    )


}
export default Order;