import { useNavigate } from "react-router-dom";
import "./featuredBrandCard.css"

const FeaturedBrandCard = ({ brand }) => {
  const navigate = useNavigate();

  const handleNavigate= ( brandid ) => {
    navigate("/explore", { state: { brandid } });
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
          <span className="featuredBrandBtn" onClick={() => handleNavigate(brand._id)}>Explore Cars</span>
        </div>
    </div>
  )
}

export default FeaturedBrandCard