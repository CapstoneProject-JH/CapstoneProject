import TotalPrice from "./TotalPrice";
import CartItem from "./CartItem";
import { useState } from "react";

export default function Cart({ error, set_Quantity_User_Cart, checkoutPage }) {

  /* 
    So we first want to get all user carts using getAllCart
      put this in a useEffect so that we only call the api one time
      store result inside of setAll_Users_Cart_Items so we can use in another useEffect
    once we have all_Users_Cart_Items contain the object of all users cart, we will map through it and store each unique userID inside of a local storage
      if localstorage.getItem !== null||undefined then store userId as key, and object cart as value
      also return within this if and return in else since map needs to have same number returned
    whenever all_Users_Cart_Items is changed, we will run the useEffect again so we can update the localStorage
  
  */
  const userCartId = 1;
  const [loading, setLoading] = useState(true)

  return (
    <>
        <>
          <p>If items don't add to cart on first try click FusionNova and try again thank you!</p>
          <h2>Shopping Cart</h2>
          <div className="userCart">
            <span>{error && <p>{error}</p>}</span>
            {!sessionStorage.getItem("token") ? (
              <p>Cart is Empty</p>
            ) : (
              JSON.parse(localStorage.getItem(`All_Products_In_User_Cart${userCartId}`)).map((values, key) => {
                console.log("Index", key)
                return (
                  <CartItem
                    key={key}
                    productId={values["productId"]}
                    quantity={JSON.parse(localStorage.getItem(`productId:${values["productId"]}[${userCartId}]`))}
                    set_Quantity_User_Cart={set_Quantity_User_Cart}
                    checkoutPage={checkoutPage}
                    loading={loading}
                    setLoading={setLoading}
                  />
                );
              })
            )}
          </div>
          <TotalPrice loading={loading} setLoading={setLoading}/>
        </>
    </>
  );
}
