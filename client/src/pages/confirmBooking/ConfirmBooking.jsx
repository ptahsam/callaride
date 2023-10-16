import "./confirmBooking.css"
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import Confirm from "../../components/confirm/Confirm"

const ConfirmBooking = () => {
  return (
    <div className='confirmBooking'>
        <Navbar />
        <div className="confirmBookingContainer">
            <Confirm />
        </div>
        <Footer />
    </div>
  )
}

export default ConfirmBooking