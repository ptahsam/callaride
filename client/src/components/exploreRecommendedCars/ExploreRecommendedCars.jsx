import { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import RecommendedCar from '../cards/RecommendedCar/RecommendedCar'
import './exploreRecommendedCars.css'

const ExploreRecommendedCars = ({ owner, city, type, brand, model }) => {

  const { data, loading, error } = useFetch(`/listings/recommended?${owner?`owner=${owner}`:``}${city?`&city=${city}`:``}${type?`&type=${type}`:``}${brand?`&brand=${brand}`:``}${model?`&model=${model}`:``}&limit=20`)
  const [recommendedCarIndex, setRecommendedCarIndex] = useState({min: 0, max: 3}); 

  const handlePrev = () => {
    if(recommendedCarIndex.min > 0){
        setRecommendedCarIndex((prev) => ({min: (prev.min - 1), max: (prev.max - 1)}))
    }
  }

  const handleNext = () => {
    if(recommendedCarIndex.max >= 3 && recommendedCarIndex.max < data.length){
        setRecommendedCarIndex((prev) => ({min: (prev.min + 1), max: (prev.max + 1)}))
    }
  }
  
  return (
    <div className='exploreRecommendedCars'>
        <div className="exploreRecommendedHeader">
            <span>Maybe You Like</span>
            <div className="exploreRecommendedHeaderDiv">
              <h1>Our <b>Recommended</b> Cars</h1>
              <div className="exploreRecommendedItemsNavs">
                  <span className="NavItem" onClick={(e) => handlePrev()}>
                      <i class='bx bx-chevron-left'></i>
                  </span>
                  <span className="NavItem" onClick={(e) => handleNext()}>
                      <i class='bx bx-chevron-right'></i>
                  </span>
              </div>
            </div>
        </div> 
        <div className="exploreRecommendedBody">
            {loading ? <>
                <p>Loading</p>
              </> : data?.slice(recommendedCarIndex.min, recommendedCarIndex.max).map((listing, index) => (
                <RecommendedCar car={listing} key={index} />
            ))}
        </div>
    </div>
  )
}

export default ExploreRecommendedCars