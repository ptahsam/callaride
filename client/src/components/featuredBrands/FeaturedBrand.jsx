import { useState } from "react"
import useFetch from "../../hooks/useFetch"
import FeaturedBrandCard from "../cards/Brand/FeaturedBrandCard/FeaturedBrandCard"
import "./featuredBrand.css"
import { max } from "date-fns"
import { useNavigate } from "react-router-dom"

const FeaturedBrand = () => {  

  const [featuredBrandIndex, setFeaturedBrandIndex] = useState({min: 0, max: 4});  

  const { data, loading, error } = useFetch(`/brand`) 

  const handlePrev = () => {
    if(featuredBrandIndex.min > 0){
        setFeaturedBrandIndex((prev) => ({min: (prev.min - 1), max: (prev.max - 1)}))
    }
  }

  const handleNext = () => {
    if(featuredBrandIndex.max >= 4 && featuredBrandIndex.max < data.length){
        setFeaturedBrandIndex((prev) => ({min: (prev.min + 1), max: (prev.max + 1)}))
    }
  }
  
  return (
    <div className="featuredBrand">
        <div className="featuredBrandContainer">
            <div className="featuredBrandTitle">
                <span>Discover your brand</span>
                <h3>Top Brands</h3>
            </div>
            <div className="featuredBrandBody">
                <div className="featuredBrandItems">
                    {loading?<>
                        <>Loading</>
                    </>:data.slice(featuredBrandIndex.min, featuredBrandIndex.max).map((brand, index)=>(
                        <FeaturedBrandCard key={brand._id} brand={brand} />
                    ))} 
                </div>
                <div className="featuredBrandItemsNavs">
                    <span className="NavItem" onClick={(e) => handlePrev()}>
                        <i class='bx bx-chevron-left'></i>
                    </span>
                    <span className="NavItem" onClick={(e) => handleNext()}>
                        <i class='bx bx-chevron-right'></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FeaturedBrand