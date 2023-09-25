import Car from "../cards/Car/CarCard";
import "./popularCars.css"

const PopularCars = () => {

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
    },
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
    },
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
              {cars.map((car, index) => (
                <Car car={car} key={index} />
              ))}
        </div>
      </div>
    </div>
  )
}

export default PopularCars