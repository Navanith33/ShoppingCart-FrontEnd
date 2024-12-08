import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState,atom} from "recoil";
import { Button,Card,Typography } from "@mui/material";
import Appbar from "./Appbar";
import { cartAppbar } from "./cart";
const items = atom({
    key:"items",
    default:[]
})
export const ItemsAppbar = atom({
  key:"ItemsApp",
  default:""
})
const Items = () =>{
    const Items = useRecoilValue(items);
    const setItems = useSetRecoilState(items);
    const setCartbar = useSetRecoilState(cartAppbar)
    const[check,setCheck]= useState(null);
    const token = localStorage.getItem('Token');
    const setItembar = useSetRecoilState(ItemsAppbar)
    const handleClick = async(Id)=>{
          const res = await axios.post("http://localhost:3000/user/addtocart",{
            id:Id
          },{
            headers:{
              authorization:`bearer ${token}`
            }
          })
          if(res.data.message=="Added to cart successfully"){
            alert(res.data.message);
          }
    }
    useEffect (()=>{
       axios.get("http://localhost:3000/admin/getItem").then((res)=>{
          setItems(res.data);
          setCheck('');
          setItembar("inItems");
          setCartbar("");
       })
    },[])
    if(check==null){
        return(
            <>
            loading....
            </>
        )
    }
    return (
        <>
        <Appbar/>
         <div
      style={{
        display: 'flex',flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px', alignItems: 'center'
      }}>
     {Items.map((sinItem) =>{
       return(
         <div>
            <Viewitemdetails sinitem={sinItem}/>
            <Button variant="contained" onClick={()=>handleClick(sinItem.id)}>ADD TO CART</Button>
          </div>
          )
        }
      )
    }
        </div>
        
        <br>
        </br>
        </>
    )
}
export function Viewitemdetails ({sinitem}){
 
    return (
      <Card variant="outlined" style={{ width: '300px',height:'280px'
      }}>
            <img 
  src={sinitem.image} 
  style={{ 
    width: "100%", 
    height: "220px",
    margin: "0",
    padding: "0"
  }}
  />       
  <Typography variant="h6" component="h2"style={{ textAlign: 'center'}}>
        {sinitem.name}
      </Typography>
            <Typography variant="h6" component="h2"style={{ textAlign: 'left'}}>
            RS.{sinitem.price}
           
      </Typography>
           
            </Card>
    )
  }
  export default Items;