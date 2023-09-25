import { NavLink } from "react-router-dom"
import "./navbar.css"

const Navbar = ({ type }) => {
  return (
    <div className="navbar">
        <div className="navContainer">
            <NavLink to="/" className="navLink">
                <div className="navTitle">
                    <h3>CALL A RIDE</h3>
                </div>
            </NavLink>
            <div className="navLinks">
                <a href="/"><span className={type === "home"?"active":""}>Home</span></a>
                <a href="/popular"><span className={type === "popular"?"active":""}>Popular</span></a>
                <a href="/explore"><span className={type === "explore"?"active":""}>Explore</span></a>
                <a href="/listcar"><span className={type === "listcar"?"active":""}>List your car</span></a>
                <div className="navbarMenu">
                    Login
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar