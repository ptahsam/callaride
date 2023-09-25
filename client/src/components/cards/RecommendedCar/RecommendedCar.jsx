import "./recommendedCar.css"

const RecommendedCar = ({ car }) => {
  return (
    <div className="recommendedCar">
        <div className="recommendedCarImg">
            <img src="../../images/section/section2.jpg" />
        </div>
        <div className="recommendedCarDetails">
            <span className="recommendedCarTitle">
                {car.name}
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
                    {car.avgRating}
                </h3>
            </div>
            <div className="recommendedCarPricing">
                <span>from</span>
                <h2>${car.rentalRate.daily}</h2>
                <em>/day</em>
            </div>
        </div>
    </div>
  )
}

export default RecommendedCar