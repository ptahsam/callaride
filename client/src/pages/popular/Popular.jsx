import Footer from "../../components/footer/Footer"
import Navbar from "../../components/navbar/Navbar"
import PopularCars from "../../components/popularCars/PopularCars"
import "./popular.css"

const Popular = () => {
  return (
    <div className="popular">
        <Navbar type={"popular"} />
        <div className="popularContainer">
            <PopularCars />
        </div>
        <Footer />
    </div>
  )
}

export default Popular