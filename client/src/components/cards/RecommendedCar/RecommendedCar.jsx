import "./recommendedCar.css"

const RecommendedCar = ({ car }) => {
  return (
    <div className="recommendedCar">
        <div className="recommendedCarImg">
            <img src={car.carPhotos[0]} />
        </div>
        <div className="recommendedCarDetails">
            <span className="recommendedCarTitle">
                {car.carBasicInfo.carName}
            </span>
            <div className="recommendedCarRating">
                <span className="recommendedRatedStars">
                    <i class='bx bxs-star' ></i>
                    <i class='bx bxs-star' ></i>
                    <i class='bx bxs-star' ></i>
                    <i class='bx bxs-star' ></i>
                    <i class='bx bxs-star' ></i>
                </span>
                <h3 className="recommendedRatedStarsCount">
                    
                </h3>
            </div>
            <div className="recommendedCarPricing">
                <span>from</span>
                <h2>${car.carPricing.daily_booking.price_per_day}</h2>
                <em>/day</em>
            </div>
        </div>
    </div>
  )
}

export default RecommendedCar