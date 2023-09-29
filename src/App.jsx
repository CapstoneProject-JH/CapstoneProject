/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import NavBar from './components/Navigation/NavBar'
import Home from './components/Navigation/Home'
import Login from './components/LoginRegister/Login'
import Register from './components/LoginRegister/Register'
import LogOut from './components/LoginRegister/LogOut'
import Cart from './components/Carts/Cart'
import Checkout from './components/Carts/Checkout'
import PlaceOrder from './components/Carts/PlaceOrder'
import Mens_Apparel from './components/Products/Mens_Apparel'
import Womans_Apparel from './components/Products/Womans_Apparel'
import Electronics from './components/Products/Electronics'
import Jewelery from './components/Products/Jewelery'
import ItemPage from './components/Products/ItemPage'
import { getAllProducts } from './API/apiCalls'
// import TextField from "@mui/material/TextField";

function App() {
  const userCartId = 1;

  const [apparel, setApparel] = useState("")
  const [items, setItems] = useState([]);
  const [homePage, setHomePage] = useState(true);
  const [item, setItem] = useState(null);
  const [quantity_User_Cart, set_Quantity_User_Cart] = useState(0)
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [cartPage, setCartPage] = useState(false);
  const [checkoutPage, setCheckoutPage] = useState(false);
  const[submitAddress, setSubmitAddress] = useState(false);
  const[submitPayment, setSubmitPayment] = useState(false);
  const [error, setError] = useState(null)
  const [getProducts, setGetProducts] = useState(null);


  useEffect(() => {
    async function compareSearch_Title(){
      try{
          const allProducts = await getAllProducts();
          setGetProducts(allProducts)
          localStorage.setItem("allLocalProducts", JSON.stringify(allProducts))

      }catch(error){
          console.error(error.message)
      }
    }
    compareSearch_Title()
    setLoading(false)
  },[])

  return (
    <>
      {loading ? <p>Loading...</p> : 
      (<>
        <Routes>
          <Route path='/' element={<NavBar setHomePage={setHomePage} token={token} cartPage={cartPage} setCartPage={setCartPage} checkoutPage={checkoutPage} setCheckoutPage={setCheckoutPage} submitAddress={submitAddress} submitPayment={submitPayment} setError={setError} error={error} quantity_User_Cart={quantity_User_Cart} setItem={setItem}/>}>
            <Route path='/' element={<Home items={items} setItems={setItems} homePage={homePage} />}/>

            {/* Product Route */}
            <Route path="/men's clothing" element={<Mens_Apparel setApparel={setApparel} items={items} setItems={setItems} homePage={homePage} setHomePage={setHomePage} setItem={setItem} token={token}/>}/>
            <Route path="/women's clothing" element={<Womans_Apparel setApparel={setApparel} items={items} setItems={setItems} homePage={homePage} setHomePage={setHomePage} setItem={setItem}/>}/>
            <Route path='/jewelery' element={<Jewelery setApparel={setApparel} items={items} setItems={setItems} homePage={homePage} setHomePage={setHomePage} setItem={setItem}/>}/>
            <Route path='/electronics' element={<Electronics setApparel={setApparel} items={items} setItems={setItems} homePage={homePage} setHomePage={setHomePage} setItem={setItem}/>}/>
            <Route path='/itempage' element={<ItemPage item={item} setItem={setItem} items={items} setItems={setItems} homePage={homePage} setHomePage={setHomePage}/>}/>
            {/* End of Product Route */}

            {/* Login/Logout/Register Route */}
            <Route path='/login' element={<Login token={token} setToken={setToken} username={username} setUsername={setUsername} password={password} setPassword={setPassword} error={error} setError={setError}/>}/>
            <Route path='/logout' element={<LogOut setToken={setToken} setHomePage={setHomePage} setItem={setItem} setItems={setItems} setApparel={setApparel} setUsername={setUsername} setSubmitAddress={setSubmitAddress} setSubmitPayment={setSubmitPayment}/>}/>
            <Route path='/register' element={<Register/>}/>
            {/* End of Login/Logout/Register Route */}

            {/* Cart Route */}
            <Route path='/cart' element={<Cart error={error} set_Quantity_User_Cart={set_Quantity_User_Cart} checkoutPage={checkoutPage}/>}/>
            <Route path='checkout' element={<Checkout item={item} setItem={setItem} setCartPage={setCartPage} setCheckoutPage={setCheckoutPage} submitAddress={submitAddress} setSubmitAddress={setSubmitAddress} submitPayment={submitPayment} setSubmitPayment={setSubmitPayment} error={error} setError={setError} checkoutPage={checkoutPage}/>}></Route>
            <Route path='placeorder' element={<PlaceOrder/>}/>
            {/* End of Cart Route */}
          </Route>
        </Routes> 
      </>)}
    </>
  )
}

export default App