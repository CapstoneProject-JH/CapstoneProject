import { useState } from "react"
import { Link } from "react-router-dom"
import Image from '../../Images/icons8-search-50.png'

export default function SearchCard({ product, setItem, setHomePage, setMobile_Menu, setHam, setSearchImage, setSearchChange}){
    // console.log(product)
    return(
        <>
            <div className="searchCard">
                <Link to='/itempage' onClick={()=>{
                    setHomePage(false)
                    setMobile_Menu(false)
                    setHam(false)
                    setItem(product)
                    setSearchImage(Image)
                    setSearchChange("")
                }}><img src={product.image} alt="image" height="290px" width="230px"/></Link>
                <Link to='/itempage' onClick={()=>{
                     setHomePage(false)
                    setMobile_Menu(false)
                    setHam(false)
                    setItem(product)
                    setSearchImage(Image)
                    setSearchChange("")
                }}><h3>{product.title}</h3></Link>
            </div>
        </>
    )
}