import useFetch from '../../hooks/useFetch'
import RecommendedCar from '../cards/RecommendedCar/RecommendedCar'
import './exploreRecommendedCars.css'

const ExploreRecommendedCars = () => {

  const { data, loading, error } = useFetch(`/listings/recommended?limit=3`)
  
  return (
    <div className='exploreRecommendedCars'>
        <div className="exploreRecommendedHeader">
            <span>Maybe You Like</span>
            <h1>Our <b>Recommended</b> Cars</h1>
        </div> 
        <div className="exploreRecommendedBody">
            {loading ? <>
                <p>Loading</p>
              </> : data?.map((listing, index) => (
                <RecommendedCar car={listing} key={index} />
            ))}
        </div>
    </div>
  )
}

export default ExploreRecommendedCars