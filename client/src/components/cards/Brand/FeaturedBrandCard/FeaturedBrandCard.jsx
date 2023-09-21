import "./featuredBrandCard.css"

const FeaturedBrandCard = ({ brand }) => {
  return (
    <div className="featuredBrandCard">
        <div className="featuredBrandLogo">
          <img src={"../../images/brands/"+brand.img} alt={brand.name} />
        </div>
        <div className="featuredBrandTitle">
          <h3>{brand.name}</h3>
        </div>
        <div className="featuredBrandButton">
          <span className="featuredBrandBtn">Explore Cars</span>
        </div>
    </div>
  )
}

export default FeaturedBrandCard