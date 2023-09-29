// import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { loginUser } from "../../API/apiCalls";
import { Link } from 'react-router-dom';


export default function Register({ username, setUsername, password, setPassword, error, setError }){
    const navigate = useNavigate();
    const minLoginNum = 5;
    const maxLoginNum = 16;
    const userCartId = 1;
  // setCartPage(true)
  // Grab desired users cart and stores the product and quantity in product state
    // useEffect(() => {
    //         if (!localStorage.getItem(`All_Products_In_User_Cart${userCartId}`)){
    //             localStorage.setItem(`All_Products_In_User_Cart${userCartId}`, '[{}]')
    //         }
            
    // }, []);

    //To see all user's login info

    async function handleSubmit(event){
        event.preventDefault();
        // loginValidate(username, password);
        loginUser(username, password, setError, navigate)
    }

    function loginValidate(username, password){
        //validate for user inputing characters under 6
        if (username.length < minLoginNum || password.length < minLoginNum){
            throw new Error("Username or password input needs to be greater than 5 and less than 17 characters. Please Try Again.");
        //validate for user inputing characters above 16
        } else if(username.length > maxLoginNum || password.length > maxLoginNum){
            throw new Error("Username or password input needs to be greater than 5 and less than 17 characters. Please Try Again.")
        //validate for user inputing a space into input text
        } else if(username.includes(" ") || password.includes(" ")){
            setError("");
            throw new Error("Username and password cannot accept spaces. Please Try Again.")
        }
    }

    return(
        <>
            <div className="container loginRegister">
                <p>Use this username and password for the demo!</p>
                <p>Username: johnd</p>
                <p>Password: m38rmF$</p>
                <div className="Login_Register">
                    <button><h2><Link to='/login' className='linkColor'>Login</Link></h2></button>
                    <h2>|</h2>
                    <span><button><h2>Register</h2></button></span>
                </div>
                {/* <form onSubmit={handleSubmit}>
                    <label>
                        <input required value={username} placeholder="Username" onChange={e =>{
                            setUsername(e.target.value)
                        }}/>
                    </label>
                    <label>
                        <input required value={password} placeholder="Password" onChange={e =>{
                            setPassword(e.target.value)
                        }}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form> */}
            </div>
            <span>{error && <p>{error}</p>}</span>
        </>
    )
}