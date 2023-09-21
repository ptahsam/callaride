import { NavLink } from "react-router-dom"
import "./navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="navContainer">
            <NavLink to="/" className="navLink">
                <div className="navTitle">
                    <h3>CALL A RIDE</h3>
                </div>
            </NavLink>
            <div className="navLinks">
                <a href="/home"><span className="active">Home</span></a>
                <a href="/popular"><span>Popular</span></a>
                <a href="/explore"><span>Explore</span></a>
                <a href="/list"><span>List your car</span></a>
                <div className="navbarMenu">
                    Login
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar