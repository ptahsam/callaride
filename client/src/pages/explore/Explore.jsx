import ExploreCars from "../../components/exploreCars/ExploreCars"
import Footer from "../../components/footer/Footer"
import Navbar from "../../components/navbar/Navbar"
import "./explore.css"

const Explore = () => {
  return (
    <div className="explore">
        <Navbar type={"explore"} />
        <div className="exploreContainer">
            <ExploreCars />
        </div>
        <Footer />
    </div>
  )
}

export default Explore