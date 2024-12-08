import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState,atom} from "recoil";
import { Viewitemdetails } from "./items";
import Appbar, { clearCart } from "./Appbar";
import { Button,Typography} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
const cart = atom({
    key:"cartItems",
    default:[]
})
export const cartAppbar = atom({
    key:"cartAppbar",
    default:""
})
const Cart = () =>{
    const Navigate = useNavigate();
    const cleared = useRecoilValue(clearCart);
    const CartItems = useRecoilValue(cart);
    const setCart = useSetRecoilState(cart)
    const [loading,setLoading]= useState(null);
    const setAppbar = useSetRecoilState(cartAppbar);
const Logintoken = localStorage.getItem('Token');
  const handleClick = ()=>{
    Navigate("/items");
  }
useEffect(()=>{
    axios.get("http://localhost:3000/user/getcartItems",
        {headers:{
            authorization: `Bearer ${Logintoken}`
          }}).then((res)=>{
               setCart(res.data);
               setLoading('');
               setAppbar("inCart")
          })
},[loading,cleared])
     if(loading==null){
        return(
            <>
            loading...
            </>
        )
     }

    if(CartItems=="cart is empty"){
        return(
            <>
            <Appbar></Appbar>
            <Typography variant="h6" component="h2"style={{ textAlign: 'center'}}>
  Your CART is Empty!!!😭
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
    <Appbar></Appbar>
         <div
      style={{
        display: 'flex',flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px', alignItems: 'center'
      }}>
        {CartItems.item.map((sinItem) =>{
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
export default Cart;