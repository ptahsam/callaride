import { useContext, useState } from "react"
import useFetch from "../../hooks/useFetch"
import "./dashboardListing.css"
import { AuthContext } from "../../contexts/AuthContext"
import Listing from "../cards/listingCard/ListingCard"
import { useNavigate } from "react-router-dom"
import Paginate from "../paginate/Paginate"
import DashboardListingManage from "../dashboardListingManage/DashboardListingManage"

const DashboardListing = ({ activeItem }) => {

  const  { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(2)

  const { data, loading, error } = useFetch(`/listings/paginated?owner=${user?._id}&page=${page}&limit=${limit}`) 

  const handlePageClick = (e) => {
    setPage(e.selected + 1)
  }

  return (
    <>
      <div className={activeItem.mainTab == 3 && activeItem.subTab == 1?"dashboardListing":"dashboardListing no-show"}>
          <div className="dashboardListingHeader">
            <h3>Listings</h3>
            <span onClick={(e) => navigate("/listcar")}>Create a Listing</span>
          </div>
          <div className="dashboardListingBody">
            {loading?<>
              <p>Loading</p>
            </>:data?.result?.length > 0?
              data?.result?.map((listing, index) => (
                <>
                  <Listing listing={listing} key={index}/>
                  <div className="horDiv" key={index + 1}></div>
                </>
              )):<></>
            }
          </div>
          <Paginate handlePageClick={handlePageClick} pageCount={data?.pageCount} />
      </div>
      <DashboardListingManage />
    </>
  )
}

export default DashboardListing