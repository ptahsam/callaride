import { carTypes } from "../utils/carTypes"
import { DateRange } from "react-date-range"
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { format } from "date-fns" 
import "./header.css"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SearchContext } from "../../contexts/SearchContext"

const Header = () => {

  const navigate = useNavigate();
  const { dispatch }  = useContext(SearchContext);

  const [dates, setDates] = useState({startDate: new Date(), endDate: new Date()})
  const [location, setLocation] = useState('')
  const [car_type, setType] = useState('');

  const handlePickup = (e) => {
    setDates((prev) => ({ ...prev, ['startDate'] : new Date(e.target.value)}))
  }

  const handleDrop = (e) => {
    setDates((prev) => ({ ...prev, ['endDate'] : new Date(e.target.value)}))
  }

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { location, car_type, dates } });
    navigate("/explore", { state: { location, car_type, dates } });
  };

  return (
    <div className="header" style={{  
      backgroundImage: "url(" + "/images/header/background.jpeg" + ")",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }} >
        <div className="headerContainer p-b-full">
          <div className="headerSearch">
            <div className="headerSearchContainer">
              <h1 className="headerTitle">FAST AND EASY RENT</h1>
              <p className="headerDesc">
                We build rental software that offers you everything you need to rent out.
              </p>
              <div className="headerPickUpLocation">
                <i class='bx bx-map'></i>
                <input 
                  type="text" 
                  placeholder="Enter location" 
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                />
              </div>
              <div className="headerCarBrand">
                <i class='bx bxs-car' ></i>
                <select
                  value={car_type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">Car Type</option>
                  {carTypes.map((item, index) => (
                    <option value={item.type} key={index}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div className="headerDates">
                <div className="headerPickUpDate">
                  <label>Pick up Date</label>
                  <div className="inputDate">
                      <input type="datetime-local" onChange={(e) => handlePickup(e)} placeholder="Drop Date"/>
                  </div>
                </div>
                <div className="headerDropDate">
                  <label>Drop Date</label>
                  <div className="inputDate">
                      <input type="datetime-local" onChange={(e) => handleDrop(e)} placeholder="Drop Date"/>
                  </div>
                </div>
              </div>
              <div className="headerButton" onClick={()=>handleSearch()}>
                <span>Search</span>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Header