import { useContext, useEffect, useRef, useState } from "react";
import { Range } from "react-range";
import Car from "../cards/Car/CarCard";
import RecommendedCar from "../cards/RecommendedCar/RecommendedCar";
import "./exploreCars.css"
import { carTypes } from "../utils/carTypes";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { getModel } from "../utils/helper";
import { useLocation } from "react-router-dom";

const ExploreCars = () => {

  const location = useLocation();

  const approvalStatus = 'submitted_for_review';

  const [city, setCity] = useState('')
  const [carBrands, setCarBrands] = useState('');
  const [selectedCarBrand, setSelectedCarBrand] = useState(null); 
  const [rating, setRating] = useState(0)
  const [hourlyBudget, setHourlyBudget] = useState({values: [0, 1000000]})
  const [dailyBudget, setDailyBudget] = useState({values: [0, 1000000]})
  const [weeklyBudget, setWeeklyBudget] = useState({values: [0, 1000000]})
  const [monthlyBudget, setMonthlyBudget] = useState({values: [0, 1000000]})
  const [carType, setCarType] = useState('')
  const [carBrand, setCarBrand] = useState('')
  const [carModel, setCarModel] = useState('')
  const [filterFrequency, setFilterFrequency] = useState('day')
  const { data, loading, error } = useFetch(`/listings?approval=${approvalStatus}&city=${city}&type=${carType}&brand=${carBrand}&model=${carModel}&hourlyMin=${hourlyBudget.values[0]}&hourlyMax=${hourlyBudget.values[1]}&dailyMin=${dailyBudget.values[0]}&dailyMax=${dailyBudget.values[1]}&weeklyMin=${weeklyBudget.values[0]}&weeklyMax=${weeklyBudget.values[1]}&monthlyMin=${monthlyBudget.values[0]}&monthlyMax=${monthlyBudget.values[1]}`)

  const cityInputRef = useRef(null);
  const carTypeSelectRef = useRef(null);
  const carBrandRef = useRef(null);

  const handleCity = (el) => {
      setCity(el)
  };

  const handleCarType = (el) => {
    setCarType(el)
  }

  const handleCarBrand = (el) => {
    setCarBrand(el)
  }

  const handleSearch = () => {
    handleCity(cityInputRef.current.value)
    handleCarType(carTypeSelectRef.current.value)
    handleCarBrand(carBrandRef.current.value)
  }

  const handleRating = (e) => {
    if(rating == e.target.value){
      setRating(0)
    }else{
      setRating(e.target.value)
    }
  }

  useEffect(() => {
    const fetchBrands = async () => {
      const allBrands =  await axios.get(`/brand`)
      setCarBrands(allBrands.data)
    }
    fetchBrands();
  },[]);

  useEffect(() => {
    if(carBrands != null && carBrands !=  ''){
      setSelectedCarBrand(getModel(carBrands, carBrand))
    }
  },[carBrand]);

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
              <input 
                type="text" 
                placeholder="Enter the location"
                ref={cityInputRef}
              />
            </div>
            <div className="exploreCarsFilterItem input-filter">
              <select 
                ref={carTypeSelectRef}
              >
                <option value={''}>-Select car type-</option>
                {carTypes.map((item, index) => (
                  <option value={item.type} key={index}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="exploreCarsFilterItem input-filter">
              <select
                ref={carBrandRef}
              >
                <option value={''}>-Select car brand-</option>
                {carBrands != null && carBrands.length > 0 && carBrands.map((brand, index) => (
                  <option key={index} value={brand._id}>{brand.name}</option>
                ))}
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
              <span 
                className="searchBtn"
                onClick={(e) => handleSearch()}
              >
                Search Cars
              </span>
            </div>
          </div>
        </div>
        <div className="exploreCarsBody">
            <div className="exploreCarsBodyFilters">
                <div className="carBodyFilterItem carBrand">
                  <span className="carModelsTitle">Models</span>
                  <select
                    onChange={(e) => setCarModel(e.target.value)}
                    value={carModel}
                  >
                    <option value={''}>-Select Car Models</option>
                    {selectedCarBrand != null && selectedCarBrand.length > 0 && selectedCarBrand[0].models.map((model, index) => (
                      <option key={index} value={model._id}>{model.model_name}</option>
                    ))}
                  </select>
                </div>
                <div className="carBodyFilterItem">
                  <span className="carPricingTitle">Prices</span>
                  <div className="carBodyFilterItemCard hasBorder budget">
                    <span className="filterItemTitle">Your budget(per Hour)</span>
                    <span className="filterItemBudget">{`kes ${hourlyBudget.values[0]} — ${hourlyBudget.values[1]}+`}</span>
                    <Range 
                      key={6666}
                      step={1}
                      min={0}
                      max={1000000}
                      values={hourlyBudget.values}
                      onChange={(values) => setHourlyBudget({values})}
                      renderTrack={({ props, children }) => (
                        <div
                          className="minValuesContainer"
                          {...props}
                          style={{
                            ...props.style,
                          }}
                        >
                          {children}
                        </div>
                      )}
                      renderThumb={({ props }) => (
                        <div 
                          className="maxValuesContainer"
                          {...props}
                          style={{
                              ...props.style,
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="carBodyFilterItemCard hasBorder budget">
                    <span className="filterItemTitle">Your budget(per Day)</span>
                    <span className="filterItemBudget">{`kes ${dailyBudget.values[0]} — ${dailyBudget.values[1]}+`}</span>
                    <Range 
                      key={6667}
                      step={1}
                      min={0}
                      max={1000000}
                      values={dailyBudget.values}
                      onChange={(values) => setDailyBudget({values})}
                      renderTrack={({ props, children }) => (
                        <div
                          className="minValuesContainer"
                          {...props}
                          style={{
                            ...props.style,
                          }}
                        >
                          {children}
                        </div>
                      )}
                      renderThumb={({ props }) => (
                        <div 
                          className="maxValuesContainer"
                          {...props}
                          style={{
                              ...props.style,
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="carBodyFilterItemCard hasBorder budget">
                    <span className="filterItemTitle">Your budget(per Week)</span>
                    <span className="filterItemBudget">{`kes ${weeklyBudget.values[0]} — ${weeklyBudget.values[1]}+`}</span>
                    <Range 
                      key={6668}
                      step={1}
                      min={0}
                      max={1000000}
                      values={weeklyBudget.values}
                      onChange={(values) => setWeeklyBudget({values})}
                      renderTrack={({ props, children }) => (
                        <div
                          className="minValuesContainer"
                          {...props}
                          style={{
                            ...props.style,
                          }}
                        >
                          {children}
                        </div>
                      )}
                      renderThumb={({ props }) => (
                        <div 
                          className="maxValuesContainer"
                          {...props}
                          style={{
                              ...props.style,
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="carBodyFilterItemCard hasBorder budget">
                    <span className="filterItemTitle">Your budget(per Month)</span>
                    <span className="filterItemBudget">{`kes ${monthlyBudget.values[0]} — ${monthlyBudget.values[1]}+`}</span>
                    <Range 
                      key={6667}
                      step={1}
                      min={0}
                      max={1000000}
                      values={monthlyBudget.values}
                      onChange={(values) => setMonthlyBudget({values})}
                      renderTrack={({ props, children }) => (
                        <div
                          className="minValuesContainer"
                          {...props}
                          style={{
                            ...props.style,
                          }}
                        >
                          {children}
                        </div>
                      )}
                      renderThumb={({ props }) => (
                        <div 
                          className="maxValuesContainer"
                          {...props}
                          style={{
                              ...props.style,
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="carBodyFilterItem carRating">
                  <div className="carRatingTitle">Rating</div>
                  <span className="carRatingDesc">Includes star and other ratings</span>
                  <div className="carRatingFilterContainer">
                    <div className="carRatingFilterItem">
                      <input type="checkbox" value={5} onChange={handleRating} checked={rating == 5} />
                      <div className="stars">
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                      </div>
                      <span>5 Stars</span>
                    </div>
                    <div className="carRatingFilterItem">
                      <input type="checkbox" value={4} onChange={handleRating} checked={rating == 4} />
                      <div className="stars">
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bx-star"></i>
                      </div>
                      <span>4 Stars</span>
                    </div>
                    <div className="carRatingFilterItem">
                      <input type="checkbox" value={3} onChange={handleRating} checked={rating == 3} />
                      <div className="stars">
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bx-star"></i>
                        <i className="bx bx-star"></i>
                      </div>
                      <span>3 Stars</span>
                    </div>
                    <div className="carRatingFilterItem">
                      <input type="checkbox" value={2} onChange={handleRating} checked={rating == 2} />
                      <div className="stars">
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bx-star"></i>
                        <i className="bx bx-star"></i>
                        <i className="bx bx-star"></i>
                      </div>
                      <span>2 Stars</span>
                    </div>
                    <div className="carRatingFilterItem">
                      <input type="checkbox" value={1} onChange={handleRating} checked={rating == 1} />
                      <div className="stars">
                        <i className="bx bxs-star"></i>
                        <i className="bx bx-star"></i>
                        <i className="bx bx-star"></i>
                        <i className="bx bx-star"></i>
                        <i className="bx bx-star"></i>
                      </div>
                      <span>1 Star</span>
                    </div>
                  </div>
                </div>
            </div>
            <div className="exploreCarsBodyResults">
              {loading ? <>
                <p>Loading</p>
              </> : data.map((listing, index) => (
                <Car car={listing} key={index} />
              ))}
            </div>
        </div>
        <div className="exploreRecommendedCars">
           <div className="exploreRecommendedHeader">
             <span>Maybe You Like</span>
             <h1>Our <b>Recommended</b> Cars</h1>
           </div> 
           <div className="exploreRecommendedBody">
                {loading ? <>
                <p>Loading</p>
                </>:data.slice(0, 3).map((car, index) => (
                    <RecommendedCar className="carItem" car={car} key={index}/>
                ))}
            </div>    
        </div>
      </div>
    </div>
  )
}

export default ExploreCars