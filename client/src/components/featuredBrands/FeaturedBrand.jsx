import FeaturedBrandCard from "../cards/Brand/FeaturedBrandCard/FeaturedBrandCard"
import "./featuredBrand.css"

const FeaturedBrand = () => {
  return (
    <div className="featuredBrand">
        <div className="featuredBrandContainer">
            <div className="featuredBrandTitle">
                <span>Discover your brand</span>
                <h3>Top Brands</h3>
            </div>
            <div className="featuredBrandBody">
                <div className="featuredBrandItems">
                    <FeaturedBrandCard />
                </div>
            </div>
        </div>
    </div>
  )
}

export default FeaturedBrand