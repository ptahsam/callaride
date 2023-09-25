import Car from "../cards/Car/CarCard"
import "./featuredNearbyCar.css"

const FeaturedNearbyCar = () => {
  const cars = [
    {
      "name": "Maruti Suzuki XL5 2023",
      "avgRating": 4,
      "img": "Maruti_2025",
      "rentalRate": {
        "hourly": 40,
        "daily": 130
      }
    },
    {
      "name": "Maruti Suzuki XL9 2012",
      "avgRating": 3,
      "img": "Maruti_2012",
      "rentalRate": {
        "hourly": 45,
        "daily": 140
      }
    },
    {
      "name": "Renault Triber MT 2013",
      "avgRating": 5,
      "img": "Renault_2013",
      "rentalRate": {
        "hourly": 20,
        "daily": 180
      }
    },
    {
      "name": "Toyota RAF 4 2023",
      "avgRating": 2,
      "img": "Toyota_raf_4_2023",
      "rentalRate": {
        "hourly": 32,
        "daily": 181
      }
    }
  ];
  return (
    <div className="featuredNearbyCar">
        <div className="featuredNearbyCarContainer">
            <div className="featuredNearbyCarTitle">
                <span className="desc">DRIVE YOUR CAR. CONVENIENT HOURLY AND DAILY RENTALS</span>
                <h1>Rent Cars Near You</h1>
            </div>
            <div className="featuredNearbyCarFilters">
              <span className="carModelFilter active">
                Suv
              </span>
              <span className="carModelFilter">
                Muv
              </span>
              <span className="carModelFilter">
                Sedan
              </span>
              <span className="carModelFilter">
                Hatchback
              </span>
              <span className="carModelFilter">
                Subash
              </span>
            </div>
            <div className="featuredNearbyCarModels">
                {cars.map((car, index) => (
                  <Car car={car} key={index} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default FeaturedNearbyCar