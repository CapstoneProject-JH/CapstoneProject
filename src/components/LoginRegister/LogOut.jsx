import { useNavigate } from "react-router";

export default function LogOut({ setToken, setHomePage, setItem, setItems, setApparel, setUsername, setSubmitAddress, setSubmitPayment }){
    const navigate = useNavigate()
    console.log("Loggin out")
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("token")
    setUsername("")
    setToken(null)
    setHomePage(true)
    setItem(null)
    setItems([])
    setApparel("")
    navigate("/")
    setSubmitAddress(false)
    setSubmitPayment(false)
}