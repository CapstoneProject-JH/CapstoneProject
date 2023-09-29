
const userCartId = 1;
let All_Local_Productz = JSON.parse(localStorage.getItem(`All_Products_In_User_Cart${userCartId}`))

export const addQuantity = (item) => {
    let localProductQuantity = JSON.parse(localStorage.getItem(`productId:${item}[${userCartId}]`))

    if(!localProductQuantity){
        // localProductQuantity += 1;
        All_Local_Productz.push({productId: item, quantity: localProductQuantity + 1})
        localStorage.setItem(`All_Products_In_User_Cart${userCartId}`, JSON.stringify(All_Local_Productz))
    }
    localProductQuantity += 1;
    All_Local_Productz.map((product, key) => {
        if(product["productId"] === item){
            console.log("Key", All_Local_Productz[`${key}`])
            All_Local_Productz.splice(key, 1, {productId: item, quantity: localProductQuantity})    
            localStorage.setItem(`All_Products_In_User_Cart${userCartId}`, JSON.stringify(All_Local_Productz))
        }
    })
    localStorage.setItem(`productId:${item}[${userCartId}]`, JSON.stringify(localProductQuantity))
}


export const reduceQuantity = (item) => {
    let localProductQuantity = JSON.parse(localStorage.getItem(`productId:${item}[${userCartId}]`))
    if(localProductQuantity > 0 && localProductQuantity){
        localProductQuantity -= 1;
        All_Local_Productz.map((product, key) => {
            if(product["productId"] === item){
                console.log("num", localProductQuantity)
                All_Local_Productz.splice(key, 1, {productId: item, quantity: localProductQuantity})    
                localStorage.setItem(`All_Products_In_User_Cart${userCartId}`, JSON.stringify(All_Local_Productz))
            }
        })
        localStorage.setItem(`productId:${item}[${userCartId}]`, JSON.stringify(localProductQuantity))
    } 
    console.log("geeze", localProductQuantity)
    if(localProductQuantity === 0){
        All_Local_Productz.map((product, key) => {
            if(product["productId"] === item){
                All_Local_Productz.splice(key, 1)
                localStorage.removeItem(`productId:${item}[${userCartId}]`)
                localStorage.setItem(`All_Products_In_User_Cart${userCartId}`, JSON.stringify(All_Local_Productz))
                console.log(All_Local_Productz.length)
            }
        })
    }
}


export const removeItemFromCart = (item, setItem2) => {
    let localProductQuantity = JSON.parse(localStorage.getItem(`productId:${item}[${userCartId}]`))

    console.log("Before splice", All_Local_Productz)
    All_Local_Productz.map((product, key) => {
        if(product["productId"] === item){
            console.log("Been")
            All_Local_Productz.splice(key, 1)
            console.log("After splice", All_Local_Productz)
            localStorage.removeItem(`productId:${item}[${userCartId}]`)
            localStorage.setItem(`All_Products_In_User_Cart${userCartId}`, JSON.stringify(All_Local_Productz))
        }
    })
    
    
}