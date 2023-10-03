import { NavLink } from "react-router-dom"
import "./navbar.css"
import { useState } from "react"

const Navbar = ({ type }) => {
  const [navbarMenuItems, toggleNavbarMenuItems] = useState(false) 
  

  
  return (
    <div className="navbar">
        <div className="navContainer">
            <NavLink to="/" className="navLink">
                <div className="navTitle">
                    <h1>Rent <span>Go</span></h1>
                </div>
            </NavLink>
            <div className="navLinks">
                <a href="/"><span className={type === "home"?"active":""}>Home</span></a>
                <a href="/popular"><span className={type === "popular"?"active":""}>Popular</span></a>
                <a href="/explore"><span className={type === "explore"?"active":""}>Explore</span></a>
                <a href="/listcar"><span className={type === "listcar"?"active":""}>List your car</span></a>
                <div className="navbarMenu">
                    <a href="/login"><span className="loginBtn">Login</span></a>
                    {navbarMenuItems && <div className="navbarMenuItems">
                        <div className="navbarMenuItem">
                            <span>My Profile</span>
                        </div>
                        <div className="navbarMenuItem">
                            <span>My Reservations</span>
                        </div>
                        <div className="navbarMenuItem">
                            <span>My Trips</span>
                        </div>
                        <div className="navbarMenuItem">
                            <span>Wishlists</span>
                        </div>
                        <div className="navbarMenuItem">
                            <span>Logout</span>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar