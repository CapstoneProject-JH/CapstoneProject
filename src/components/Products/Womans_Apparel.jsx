import Card from "./Card";
import Home from "../Navigation/Home";
import { useEffect } from "react";

export default function Womans_Apparel({ setApparel, items, setItems, homePage, setHomePage, setItem }){

    useEffect(() =>{
        setHomePage(false)
        setApparel("women's clothing")
    }, [])
    
    return(
        <>
            <Home items={items} setItems={setItems} homePage={homePage}/>
            <div className="cards">
                {items.map((item, key) => {
                    return(
                        <Card key={key} item={item} setItem={setItem}/>
                    )
                })}
            </div>
            
        </>
    )
}