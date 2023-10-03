import { useState } from "react";
import Car from "../cards/Car/CarCard";
import RecommendedCar from "../cards/RecommendedCar/RecommendedCar";
import "./exploreCars.css"
import { carTypes } from "../utils/carTypes";

const ExploreCars = () => {

  const [filterFrequency, setFilterFrequency] = useState('day');
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
    <div className="exploreCars">
      <div className="exploreCarsContainer">
        <div className="exploreCarsHeader">
          <h1 className="exploreCarsTitle">
            Explore Cars
          </h1>
          <div className="exploreCarsFilters">
            <div className="exploreCarsFilterItem input-filter location">
              <i class='bx bx-map'></i>
              <input type="text" placeholder="Enter the location"/>
            </div>
            <div className="exploreCarsFilterItem input-filter">
              <select>
                <option>Select car type</option>
                {carTypes.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
              </select>
            </div>
            <div className="exploreCarsFilterItem input-filter">
              <select>
                <option>Select car brand</option>
              </select>
            </div>
            <div className="exploreCarsFilterItem rental-frequency">
              <span 
                className={filterFrequency === 'day'?"active":""}
                onClick={(e) => setFilterFrequency('day')}
              >
                Day
              </span>
              <span
                className={filterFrequency === 'hour'?"active":""}
                onClick={(e) => setFilterFrequency('hour')}
              >
                Hour
              </span>
            </div>
            <div className="exploreCarsFilterItem">
              <span className="searchBtn">
                Search Cars
              </span>
            </div>
          </div>
        </div>
        <div className="exploreCarsBody">
              {cars.map((car, index) => (
                <Car car={car} key={index} />
              ))}
        </div>
        <div className="exploreRecommendedCars">
           <div className="exploreRecommendedHeader">
             <span>Maybe You Like</span>
             <h1>Our <b>Recommended</b> Cars</h1>
           </div> 
           <div className="exploreRecommendedBody">
                {cars.slice(0, 3).map((car, index) => (
                    <RecommendedCar className="carItem" car={car} key={index}/>
                ))}
            </div>    
        </div>
      </div>
    </div>
  )
}

export default ExploreCars