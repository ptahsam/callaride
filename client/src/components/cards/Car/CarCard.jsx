import { Link, useNavigate } from "react-router-dom"
import "./carCard.css"
import { createRatingStars, getAverageRating } from "../../utils/helper"
import useFetch from "../../../hooks/useFetch"

const CarCard = ({ car }) => {

  const { data, loading, error } = useFetch(`/reviews?listing=${car._id}`) 
  const navigate = useNavigate();

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
          <span className="carTitle" onClick={() => navigate(`/listings/${car._id}`)}>{car.carBasicInfo.carName}</span>
          <div className="carRentalRates">
            <span className="daily">KES {car.carPricing.daily_booking.price_per_day} / <em>Day</em></span>
            <span className="hourly">KES {car.carPricing.hourly_booking.price_per_hour} / <em>Hr</em></span>
          </div>
          <div className="carRating">
            <span className="ratedStars">
              {createRatingStars(getAverageRating(data)).map((rating, index) => (
                  <i className={rating} key={index}></i>
              ))}
            </span>
            <span className="reviewCarCount">{`${getAverageRating(data)} (${data.length})`}</span>
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