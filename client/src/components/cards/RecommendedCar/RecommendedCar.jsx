import { useNavigate } from "react-router-dom"
import { createRatingStars, getAverageRating } from "../../utils/helper"
import "./recommendedCar.css"

const RecommendedCar = ({ car }) => {
  const navigate = useNavigate();


  return (
    <div className="recommendedCar" onClick={() => navigate(`/listings/${car._id}`)}>
        <div className="recommendedCarImg">
            <img src={car.carPhotos[0]} />
        </div>
        <div className="recommendedCarDetails">
            <span className="recommendedCarTitle">
                {car.carBasicInfo.carName}
            </span>
            <div className="recommendedCarRating">
                <span className="recommendedRatedStars">
                {createRatingStars(car.ratingavg).map((rating, index) => (
                    <i className={rating} key={index}></i>
                ))}
                </span>
                <span className="recommendedRatedStarsCount">
                    {`${car.ratingavg} (${car.ratingavg} Reviews)`}
                </span>
            </div>
            <div className="recommendedCarPricing">
                <span>from</span>
                <h2>KES {car.carPricing.daily_booking.price_per_day}</h2>
                <em>/day</em>
            </div>
        </div>
    </div>
  )
}

export default RecommendedCar