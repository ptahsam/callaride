import { useContext, useEffect, useState } from "react"
import { useMediaQuery } from 'react-responsive'
import useFetch from "../../hooks/useFetch"
import FeaturedBrandCard from "../cards/Brand/FeaturedBrandCard/FeaturedBrandCard"
import "./featuredBrand.css"

const FeaturedBrand = () => {  
  const [isMobile, setIsMobile] = useState(useMediaQuery({ query: '(max-width: 480px)' }))
  const [featuredBrandIndex, setFeaturedBrandIndex] = useState({min: 0, max: isMobile?1:4});  

  const { data, loading, error } = useFetch(`/brand`) 

  const handlePrev = () => {
    if(featuredBrandIndex.min > 0){
        setFeaturedBrandIndex((prev) => ({min: (prev.min - 1), max: (prev.max - 1)}))
    }
  }

  const handleNext = () => {
    if(featuredBrandIndex.max >= isMobile?1:4 && featuredBrandIndex.max < data.length){
        setFeaturedBrandIndex((prev) => ({min: (prev.min + 1), max: (prev.max + 1)}))
    }
  }

  const handleResize = () => {
    if (window.innerWidth <= 480) {
        setIsMobile(true)
    } else {
        setIsMobile(false)
    }
  }
  
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  }, [])
  
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
                        <FeaturedBrandCard key={index} brand={brand}/>
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