import "./carCard.css"

const CarCard = ({ car }) => {
  return (
    <div className='carCard'>
        <div className="carCardHeader">
            <img src="../../images/section/section2.jpg"/>
            <span>
             <i class='bx bx-heart' ></i>
            </span>
            <div className="carCardCover">

            </div>
        </div>
        <div className="carCardBody">
          <span className="carTitle">{car.name}</span>
          <div className="carRentalRates">
            <span className="daily">$ {car.rentalRate.daily} / <em>Day</em></span>
            <span className="hourly">$ {car.rentalRate.hourly} / <em>Hr</em></span>
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
          <div className="rentCarBtn">
            <span>Rent Now</span>
          </div>
        </div>
    </div>
  )
}

export default CarCard