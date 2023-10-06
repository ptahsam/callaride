import { useState } from "react"
import useFetch from "../../hooks/useFetch"
import Car from "../cards/Car/CarCard"
import "./featuredNearbyCar.css"
import { carTypes } from "../utils/carTypes"

const FeaturedNearbyCar = () => {
  const [activeCarType, setActiveCarType] = useState(carTypes[0])
  const { data, loading, error } = useFetch(`/listings?type=${activeCarType.type}`);

  return (
    <div className="featuredNearbyCar">
        <div className="featuredNearbyCarContainer">
            <div className="featuredNearbyCarTitle">
                <span className="desc">DRIVE YOUR CAR. CONVENIENT HOURLY AND DAILY RENTALS</span>
                <h1>Rent Cars Near You</h1>
            </div>
            <div className="featuredNearbyCarFilters">
              {carTypes.slice(0, 7).map((carType, index) => (
                <span 
                  key={index}
                  className={activeCarType == carType?"carModelFilter active":"carModelFilter"}
                  onClick={(e) => setActiveCarType(carType)}
                >
                {carType.name}
                </span>
              ))}
            </div>
            <div className="featuredNearbyCarModels">
              {loading ? <>
                <p>Loading</p>
              </> : data.slice(0, 4).map((listing, index) => (
                <Car car={listing} key={listing._id} />
              ))}
            </div>
        </div>
    </div>
  )
}

export default FeaturedNearbyCar