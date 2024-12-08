import React from 'react';
import { Button, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { cartAppbar } from './cart';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { ItemsAppbar } from './items';
import axios from 'axios';
export const clearCart = atom({
  key:"clearcart",
  default:""
})
const Appbar = () => {
  const Navigate = useNavigate();
  const setClearcart = useSetRecoilState(clearCart);
  const cartApp = useRecoilValue(cartAppbar);
  const itemApp = useRecoilValue(ItemsAppbar);
  const chtoken = localStorage.getItem('Token');
const Checkout = async()=>{
  try{
  const res = await axios.get("http://localhost:3000/user/checkout",{
    headers:{
      authorization:`bearer ${chtoken}`
    }
  })
  alert(res.data.message);
  setClearcart("cleared");}
  catch{
    alert("hi");
  }
}
  const handleOrder = () => {
    Navigate('/orders');
  };
  const handleItems = () => {
    Navigate('/items');
  };
  const handleCart = () => {
    Navigate('/cart');
  };
  if(cartApp=="inCart"){
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h6" component="h2">
        Shopping Cart
      </Typography>
      <div>
      <Button variant="text" onClick={handleItems}>
          Items
        </Button>
        <Button variant="text" onClick={handleOrder}>
          Orders
        </Button>
        <Button variant="text" onClick={Checkout}>
          Checkout
        </Button>
      </div>
    </div>
  )}
  if(itemApp=="inItems"){
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h6" component="h2">
        Shopping Cart
      </Typography>
      <div>
      <Button variant="text" onClick={handleCart}>
          Cart
        </Button>
        <Button variant="text" onClick={handleOrder}>
          Orders
        </Button>
        <Button variant="text" onClick={Checkout}>
          Checkout
        </Button>
      </div>
    </div>
  );
}

};

export default Appbar;
