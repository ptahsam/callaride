import { NavLink, useNavigate } from "react-router-dom"
import "./navbar.css"
import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"

const Navbar = ({ type }) => {
  const  { user, dispatch  } = useContext(AuthContext)
  const navigate = useNavigate()
  const [navbarMenuItems, toggleNavbarMenuItems] = useState(false) 

  const logOut = () => {
    toggleNavbarMenuItems(false)
    dispatch({ type: "LOGOUT" })
  }

  const handleNavigate = (item) => {
    toggleNavbarMenuItems(false)
    navigate("/dashboard", { state: { item } });
  };
  
  return (
    <div className="navbar">
        <div className="navContainer">
            <NavLink to="/" className="navLink">
                <div className="navTitle">
                    <h1>Rent <span>Go</span></h1>
                </div>
            </NavLink>
            <div className="navLinks">
                <a className="navLink" href="/"><span className={type === "home"?"active":""}>Home</span></a>
                <a className="navLink" href="/explore"><span className={type === "explore"?"active":""}>Explore</span></a>
                <a className="navLink" href="/listcar"><span className={type === "listcar"?"active":""}>List your car</span></a>
                <a className="navLink" href="/contact"><span className={type === "contact"?"active":""}>Contact Us</span></a>
                <a className="navLink" href="/about"><span className={type === "about"?"active":""}>About Us</span></a>
                <div className="navbarMenu">
                    {user? 
                    <div className="userProfile" onClick={(e) => toggleNavbarMenuItems((prev) => (!prev))}>
                        <img src={user?.photo != ''?user?.phto:'../../images/profile/profile.jpg'} alt={user?.firstname}/>
                        <span>{user?.firstname}</span>
                        {navbarMenuItems?<i class='bx bx-chevron-up'></i>:<i class='bx bx-chevron-down'></i>}
                    </div>
                    :<a href="/login"><span className="loginBtn">Login</span></a>
                    }
                    {navbarMenuItems && <div className="navbarMenuItems">
                        <div className="navbarMenuItem" onClick={(e) => handleNavigate({ mainTab : 1, subTab: 1 })}>
                            <span>My Account</span>
                        </div>
                        <div className="navbarMenuItem" onClick={(e) => handleNavigate({ mainTab : 2, subTab: 1 })}>
                            <span>My Bookings</span>
                        </div>
                        <div className="navbarMenuItem" onClick={(e) => handleNavigate({ mainTab : 3, subTab: 1 })}>
                            <span>My Listings</span>
                        </div>
                        <div className="navbarMenuItem" onClick={(e) => handleNavigate({ mainTab : 4, subTab: 1  })}>
                            <span>Notifications</span>
                        </div>
                        <div className="navbarMenuItem" onClick={()=>logOut()}>
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