import FeaturedBrandCard from "../cards/Brand/FeaturedBrandCard/FeaturedBrandCard"
import "./featuredBrand.css"

const FeaturedBrand = () => {
  const brands = [
    {
        "name": "Renault",
        "img": "renault.png"
    },
    {
        "name": "Hyundai",
        "img": "hyundai.png"
    },
    {
        "name": "Maruti",
        "img": "maruti.png"
    }
  ];  
  return (
    <div className="featuredBrand">
        <div className="featuredBrandContainer">
            <div className="featuredBrandTitle">
                <span>Discover your brand</span>
                <h3>Top Brands</h3>
            </div>
            <div className="featuredBrandBody">
                <div className="featuredBrandItems">
                    {brands.map((brand, index)=>(
                        <FeaturedBrandCard key={index} brand={brand} />
                    ))} 
                </div>
                <div className="featuredBrandItemsNavs">
                    <span className="NavItem">
                        <i class='bx bx-chevron-left'></i>
                    </span>
                    <span className="NavItem">
                        <i class='bx bx-chevron-right'></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FeaturedBrand