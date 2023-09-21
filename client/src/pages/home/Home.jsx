import FeaturedBrand from "../../components/featuredBrands/FeaturedBrand"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import Navbar from "../../components/navbar/Navbar"
import Section from "../../components/section/Section"
import "./home.css"

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Header />
      <div className="homeContainer">
          <Section />
          <FeaturedBrand />
      </div>
      <Footer />
    </div>
  )
}

export default Home