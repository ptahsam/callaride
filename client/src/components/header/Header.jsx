import { carTypes } from "../utils/carTypes"
import "./header.css"

const Header = () => {

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
                <input type="text" placeholder="Pick up location" />
              </div>
              <div className="headerCarBrand">
                <i class='bx bxs-car' ></i>
                <select>
                  <option value="">Car Type</option>
                  {carTypes.map((item, index) => (
                    <option key={index}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="headerDates">
                <div className="headerPickUpDate">
                  <i class='bx bx-calendar-alt'></i>
                  <input type="text" placeholder="Pickup Date" />
                </div>
                <div className="headerDropDate">
                  <i class='bx bx-calendar-alt'></i>
                  <input type="text" placeholder="Drop Date" />
                </div>
              </div>
              <div className="headerButton">
                <span>Search</span>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Header