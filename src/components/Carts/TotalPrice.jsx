import { useEffect, useState } from "react";
import { getItem } from "../../API/apiCalls"


const userCartId = 1;

export default function TotalPrice({ loading, setLoading}){

    let cartItems = JSON.parse(localStorage.getItem(`All_Products_In_User_Cart${userCartId}`))
    const [itemPriceWithQuantity, setItemPriceWIthQuantity] = useState(0)
    
    
    useEffect(() =>{
        if(cartItems !== null){
            const totalPrice = cartItems.reduce((accumulator, currentItem, index) => {
                multiplyQuantityOfProduct(currentItem)
                accumulator += JSON.parse(localStorage.getItem(`ProductTotalPrice_${currentItem["productId"]}`))
                
                return accumulator
            },0)

            setItemPriceWIthQuantity(totalPrice)
            localStorage.setItem('TotalPrice', totalPrice)
        }
        setLoading(false)
    },[loading])

    async function multiplyQuantityOfProduct(currentItem){
        
        const itemDescription = await getItem(currentItem["productId"])
        const price = itemDescription["price"] * currentItem["quantity"]
        
        localStorage.setItem(`ProductTotalPrice_${currentItem["productId"]}`, price)

    }
    
    return(
        <>
            <hr></hr>
            {loading ? "" : <p>Total: ${localStorage.getItem('TotalPrice')}</p>}
            
        </>
    )
}