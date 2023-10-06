import useFetch from "../../hooks/useFetch";
import Car from "../cards/Car/CarCard";
import "./popularCars.css"

const PopularCars = () => {

  const { data, loading, error } = useFetch("/listings")

  console.log(data)

  return (
    <div className="popularCars">
      <div className="popularCarsContainer">
        <div className="popularCarsHeader">
          <h1 className="popularCarsTitle">
            Popular Cars
          </h1>
          <div className="popularCarsFilters">
            <div className="popularCarsFilterItem input-filter location">
              <i class='bx bx-map'></i>
              <input type="text" placeholder="Enter the location"/>
            </div>
            <div className="popularCarsFilterItem input-filter">
              <select>
                <option>Select car type</option>
              </select>
            </div>
            <div className="popularCarsFilterItem input-filter">
              <select>
                <option>Select car brand</option>
              </select>
            </div>
            <div className="popularCarsFilterItem rental-frequency">
              <span className="active">Day</span>
              <span>Hour</span>
            </div>
            <div className="popularCarsFilterItem">
              <span className="searchBtn">
                Search Cars
              </span>
            </div>
          </div>
        </div>
        <div className="popularCarsBody">
              {loading ? <>
                <p>Loading</p>
              </> : data.map((listing, index) => (
                <Car car={listing} key={index} />
              ))}
        </div>
      </div>
    </div>
  )
}

export default PopularCars