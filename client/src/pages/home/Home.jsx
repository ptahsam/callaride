import FeaturedBrand from "../../components/featuredBrands/FeaturedBrand"
import FeaturedNearbyCar from "../../components/featuredNearbyCars/FeaturedNearbyCar"
import FeaturedTestimony from "../../components/featuredTestimony/FeaturedTestimony"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import Navbar from "../../components/navbar/Navbar"
import Section from "../../components/section/Section"
import "./home.css"

const Home = () => {
  return (
    <div className="home">
      <Navbar type={"home"} />
      <Header />
      <div className="homeContainer">
          <Section />
          <FeaturedBrand />
          <FeaturedNearbyCar />
          <FeaturedTestimony />
      </div>
      <Footer />
    </div>
  )
}

export default Home