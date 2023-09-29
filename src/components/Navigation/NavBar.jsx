import { Link, Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect, useCallback } from 'react';
import Searchbox from './Searchbox';
import SearchCard from './SearchCard';
import Checkbox from './Checkbox';
import Image from '../../Images/icons8-search-50.png'
import Image2 from '../../Images/icons8-x-48.png'
import React from 'react';

export default function NavBar({ setHomePage, token, cartPage, setCartPage, checkoutPage, setCheckoutPage, submitAddress, submitPayment, setError, setSubmitAddress, setSubmitPayment, setItem}){
    
    const [searchChange, setSearchChange] = useState("");
    const [ham, setHam] = useState(false)
    const [mobile_menu, setMobile_Menu] = useState(false)
    const [searchImage, setSearchImage] = useState(Image);
    const [isAscendingOrder, setIsAscendingOrder] = useState(false)
    const [isDescendingOrder, setIsDescendingOrder] = useState(false)
    const productsByPrice = useRef(null)

    const navigate = useNavigate();
    const userCartId = 1;
    
    console.log("gee",cartPage)
    return(
        <>
            <header className="container">
                <div className="navbar">
                    <div className="storeName">
                        <h1><Link to='/' className="linkColor" onClick={()=>{
                            setHomePage(true)
                            setError(null)
                            setCartPage(false)
                            setCheckoutPage(false)
                            setSubmitAddress(false)
                            setSubmitPayment(false)
                        }}>FusionNova</Link></h1>
                    </div>
                    <div className='userName'>
                        {token ? <p>User: {sessionStorage.getItem("username")}</p> : <p></p>}
                    </div>
                    <div className="userButtons">
                        
                        {!token 
                            ? <button><Link to='/login' className="linkColor" onClick=
                                {() =>{
                                    setError(null)
                                    setCartPage(false)
                                    setCheckoutPage(false)
                                    setSubmitAddress(false)
                                    setSubmitPayment(false)
                                }}>Login</Link></button> 
                            : <button><Link to='/logout' className="linkColor" onClick=
                                {() =>{
                                    setCartPage(false)
                                    setCheckoutPage(false)
                                }}>LogOut</Link></button>
                        }

                        {((cartPage && sessionStorage.getItem("token") === null)) 
                            ? <button><Link to='/cart' className="linkColor" onClick=
                                {() =>{
                                    setCartPage(true);
                                    setError("Please Login before Checkout.")
                                }}>Checkout</Link></button>
                        : ((cartPage && (JSON.parse(localStorage.getItem(`All_Products_In_User_Cart${userCartId}`)).length === 0))) 
                            ? <button><Link to='/cart' className="linkColor" onClick=
                                {() =>{
                                    setCartPage(true);
                                    setError("Cart is Empty.")
                                }}>Checkout</Link></button>
                        : ((cartPage) && !(sessionStorage.getItem("token") === null)) 
                            ? <button><Link to='/checkout' className='linkColor' onClick=
                                {() =>{
                                    localStorage.setItem("isCheckoutPage", true)
                                    setCheckoutPage(true)
                                    setCartPage(false)
                                    setError(null)
                                }}>Checkout</Link></button>
                        : ((checkoutPage) && !(sessionStorage.getItem("token") === null)) 
                            ? <button onClick=
                                {() =>{
                                    if(submitAddress && submitPayment){
                                        setCartPage(false)
                                        setCheckoutPage(false)
                                        localStorage.setItem("isCheckoutPage", false)
                                        setError(null)
                                        navigate('/placeorder')
                                    }else{
                                        setError("Complete both Address and Payment form to place order")
                                        throw new Error("Complete both Address and Payment form to place order")
                                    }
                                }}>Place your order</button> 
                        : <button><Link to='/cart' className="linkColor" onClick=
                                {() =>{
                                    setCartPage(true);
                                    setError(null)
                                }}>Cart</Link></button>}
                        <div className={"ham" + (!ham ? "" : " active")}>
                            <img src={searchImage} alt="search" height="40px" width="40px" onClick={() =>{
                                if(ham){
                                    setHam(false)
                                    setMobile_Menu(false)
                                    setSearchImage(Image)
                                }else{
                                    setHam(true)
                                    setMobile_Menu(true)
                                    setSearchImage(Image2)
                                }
                            }}/>
                                
                            
                        </div>                       
                        <div className={"mobileMenu" + (!mobile_menu ? "" : " active")}>
                            <h2>Search Catalog</h2>
                            <Searchbox setSearchChange={setSearchChange} searchChange={searchChange}/>
                            <Checkbox isAscendingOrder={isAscendingOrder} setIsAscendingOrder={setIsAscendingOrder} isDescendingOrder={isDescendingOrder} setIsDescendingOrder={setIsDescendingOrder} productsByPrice={productsByPrice} setItem={setItem} setHomePage={setHomePage} setMobile_Menu={setMobile_Menu} setHam={setHam} setSearchImage={setSearchImage} setSearchChange={setSearchChange} setCartPage={setCartPage} searchChange={searchChange}/>

                        </div>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    )
}
//change