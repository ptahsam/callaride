import "./listing.css"
import Navbar from '../../components/navbar/Navbar'
import Footer from "../../components/footer/Footer"
import SingleListing from "../../components/SingleListing/SingleListing"

const Listing = () => {
  return (
    <div className='listing'>
        <Navbar />
        <div className="listingContainer">
            <SingleListing />
        </div>
        <Footer />
    </div>
  )
}

export default Listing