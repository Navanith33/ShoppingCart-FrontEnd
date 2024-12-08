import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './Login';
import Signup from './signup';
import Items from './items';
import Cart from './cart';
import Order from './orders';
import Landingbar from './Landingbar';
function App() {

  return (
    <>
     <div>
<Router>
<Routes>
  
  <Route path = "/signin" element={<Login/>}/>
  <Route path = "/" element ={<Signup/>}/>
  <Route path = "/Items" element={<Items/>}/>
  <Route path = "/cart" element={<Cart/>}/>
  <Route path = "/orders" element={<Order/>}/>
</Routes>
</Router>
 </div>
    </>
  )
}

export default App
