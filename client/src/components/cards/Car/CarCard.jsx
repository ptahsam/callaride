import { Link } from "react-router-dom"
import "./carCard.css"

const CarCard = ({ car }) => {
  return (
    <div className='carCard'>
        <div className="carCardHeader">
            <img src={car.carPhotos[0]}/>
            <span>
             <i class='bx bx-heart' ></i>
            </span>
            <div className="carCardCover">

            </div>
        </div>
        <div className="carCardBody">
          <span className="carTitle">{car.carBasicInfo.carName}</span>
          <div className="carRentalRates">
            <span className="daily">$ {car.carPricing.daily_booking.price_per_day} / <em>Day</em></span>
            <span className="hourly">$ {car.carPricing.hourly_booking.price_per_hour} / <em>Hr</em></span>
          </div>
          <div className="carRating">
            <span className="ratedStars">
              <i class='bx bxs-star' ></i>
              <i class='bx bxs-star' ></i>
              <i class='bx bxs-star' ></i>
              <i class='bx bxs-star' ></i>
              <i class='bx bxs-star' ></i>
            </span>
          </div>
          <Link to={`/listings/${car._id}`} className="carLink">
            <div className="rentCarBtn">
              <span>Rent Now</span>
            </div>
          </Link>
        </div>
    </div>
  )
}

export default CarCard