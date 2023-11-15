import { useNavigate } from "react-router-dom";
import "./featuredBrandCard.css"
import { useContext } from "react";
import { SearchContext } from "../../../../contexts/SearchContext"


const FeaturedBrandCard = ({ brand }) => {
  const { dispatch }  = useContext(SearchContext); 
  const navigate = useNavigate();

  const handleClick = (car_brand, place, car_type, dates={} ) => {
    dispatch({ type: "NEW_SEARCH", payload: { place, car_type, car_brand, dates } });
    navigate("/explore");
  };

  return (
    <div className="featuredBrandCard">
        <div className="featuredBrandLogo">
          <img src={brand.logo} alt={brand.name} />
        </div>
        <div className="featuredBrandTitle">
          <h3>{brand.name}</h3>
        </div>
        <div className="featuredBrandButton">
          <span className="featuredBrandBtn" onClick={() => handleClick(brand._id)}>Explore Cars</span>
        </div>
    </div>
  )
}

export default FeaturedBrandCard