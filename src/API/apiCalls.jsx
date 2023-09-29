
/* Products API calls */
export const getAllProducts = async() =>{
    try{
        const response = await fetch('https://fakestoreapi.com/products');
        const result = await response.json();
        return result;
    }catch(error) {
        console.error(error.message)
    }
}
export const getClothing = async (apparel, items, setItems ) => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${apparel}`);
        const result = await response.json();
        setItems(result)
        return items
    } catch (error) {
        console.error(error.message);
    }
};

export const getItem = async (productId) => {
    try{
        let multipliedPrice = 0;
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const result = await response.json();
        
        return result
    } catch(error){
        console.error(error.message);
    }
}


/* End of Products API calls */


/*Cart API calls*/
export const getUserCart = async (userId) => {
    try{
        const response = await fetch(`https://fakestoreapi.com/carts/user/${userId}`);
        const result = await response.json();
        return result
    }catch(error){
        console.error(error.message);
    }
}
  
export const getAllCart = async() =>{
    try{
        const response = await fetch('https://fakestoreapi.com/carts')
        const result = await response.json()
        return result;
    }catch(error){
        console.error(error.message);
    }
}
export const addToCart = async (userId, productId) => {
    try {
        const response = await fetch('https://fakestoreapi.com/carts',{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(
                {
                    userId: userId,
                    date:2019-12-10,
                    products:[{productId:productId,quantity:1},{productId:productId,quantity:5}]
                }
            )
        })
        const result = await response.json();
        console.log(result);
    }catch(error){
        console.error(error.message);
    }
}

export const updateInCart = async (userId, productId, quantity) => {
    try{
        const response = await fetch('https://fakestoreapi.com/carts/1',{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(
                {
                    userId:userId,
                    date:2019-12-10,
                    products:[{productId:productId,quantity:quantity}]
                }
            )
        })
        const result = await response.json();
        console.log(result);
    }catch(error){
        console.error(error.message);
    }
}

/* End of Cart API calls*/


/*  User API calls   */
export const getAllUsers = async() =>{
    try{
        const response = await fetch('https://fakestoreapi.com/users');
        const result = await response.json();
        console.log(result);
        return result
    }catch(error){
        console.error(error.message)
    }
}

export const updateUserAddress = async(firstname, lastname, city, street, number, zipcode, phone, setError) =>{
    try{
        if(zipcode.length !== 5 || isNaN(Number(zipcode))){
            setError("Invalid zipcode")
            throw new Error("Invalid zipcode");
        }
        if(phone.length !== 10 || isNaN(Number(phone))){
            setError("Invalid phone number")
            throw new Error("invalid phone number");
        }
        const response = await fetch('https://fakestoreapi.com/users/1',{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(
                {
                    name:{
                        firstname: firstname,
                        lastname: lastname
                    },
                    address:{
                        city: city,
                        street: street,
                        number: number, //int
                        zipcode: zipcode, //string
                    },
                    phone: phone //string
                }
            )
        });
        const result = await response.json();
        return result
    }catch(error){
        console.error(error.message)
    }
}

/* End of User API calls */




/*  Local Data */

export const allLocalUserCart = async() => {
    try{
        const response = await fetch('../API_Data/allUserCart.json');
        const result = await response.json()
        console.log(result)
    } catch(error){
        console.error(error.message)
    }
}



/* End of Local Data */

/*login */

export const loginUser = async(username, password, setError, navigate) => {
    try{
        const response = await fetch("https://fakestoreapi.com/auth/login",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body:JSON.stringify({
                username: `${username}`,
                password: `${password}`
            })
        });
        if(!response.ok){
            // console.log(response) 
            setError("Invalid Username or password. Please try again")
            // console.log(error)
            throw new Error("Invalid Username or password. Please try again")
        }
        const result = await response.json();
        console.log(result)
        sessionStorage.setItem("token", result.token)
        sessionStorage.setItem("username", username)
        // setToken(result.token)

        navigate('/')    
    }catch(error){
        setError(error.message)
        console.error(error)
    }
}