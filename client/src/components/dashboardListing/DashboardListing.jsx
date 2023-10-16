import { useContext } from "react"
import useFetch from "../../hooks/useFetch"
import "./dashboardListing.css"
import { AuthContext } from "../../contexts/AuthContext"
import Listing from "../cards/listingCard/ListingCard"
import { useNavigate } from "react-router-dom"

const DashboardListing = ({ activeItem }) => {

  const  { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const { data, loading, error } = useFetch(`/listings?owner=${user._id}`) 

  return (
    <div className={activeItem.mainTab == 3 && activeItem.subTab == 1?"dashboardListing":"dashboardListing no-show"}>
        <div className="dashboardListingHeader">
          <h3>Listings</h3>
          <span onClick={(e) => navigate("/listcar")}>Create a Listing</span>
        </div>
        <div className="dashboardListingBody">
          {loading?<>
            <p>Loading</p>
          </>:data.length > 0?
            data.map((listing, index) => (
              <>
                <Listing listing={listing} key={index}/>
                <div className="horDiv" key={index + 1}></div>
              </>
            )):<></>
          }
        </div>
    </div>
  )
}

export default DashboardListing