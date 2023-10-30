import { useContext, useEffect, useState } from "react"
import "./dashboardBooking.css"
import { AuthContext } from "../../contexts/AuthContext"
import useFetch from "../../hooks/useFetch"
import BookingCard from "../cards/bookingCard/BookingCard"
import "../paginate/paginate.css"
import Paginate from "../paginate/Paginate"
import axios from "axios"

const DashboardBooking = ({ activeItem }) => {

  const  { user } = useContext(AuthContext)

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(1)
  const [listings, setListings] = useState([])
  const [bookingStatus, setBookingStatus] = useState('');
  const [selectedListing, setSelectedListing] = useState('')
  const { data, loading, error } = useFetch(`/bookings/paginated?owner=${user?._id}&listingid=${selectedListing}&approvalstatus=${bookingStatus}&page=${page}&limit=${limit}`)

  const handlePageClick = (e) => {
    setPage(e.selected + 1)
  }

  const handleListingChange = (e) => {
    setSelectedListing(e.target.value)
  }

  const handleBookingStatus = (e) => {
    setBookingStatus(e.target.value)
  }

  useEffect(() => {
    const fetchListings = async () => {
        const allListings =  await axios.get(`/listings?owner=${user?._id}`)
        setListings(allListings.data)
      }
      fetchListings();
  },[user]);

  console.log(data)

  return (
    <div className={activeItem.mainTab == 2 && activeItem.subTab == 1?"dashboardBooking":"dashboardBooking no-show"}>
        <div className="dashboardBookingHeader">
            <span className="dashboardBookingTitle">
                Bookings
            </span>
            <div className="dashboardBookingHeaderBody">
                <div className="dashboardBookingItem">
                    <select
                        onChange={(e) => handleListingChange(e)}
                        value={selectedListing}
                    >
                        <option value=''>All Listings</option>
                        {listings?.map((listing, index) => (
                            <option value={listing?._id} key={index}>{listing?.carBasicInfo?.carName}</option>
                        ))}
                    </select>
                </div>
                <div className="dashboardBookingItem input">
                    <input type="datetime-local" />
                    <span className="vDiv"></span>
                    <input type="datetime-local" />
                </div>
                <div className="dashboardBookingItem">
                    <select
                        onChange={(e) => handleBookingStatus(e)}
                        value={bookingStatus}
                    >
                        <option value=''><input type="checkbox" /><span>Booking Status</span></option>
                        <option value={'awaiting_confirmation'}><input type="checkbox" /><span>Awaiting Confirmation</span></option>
                        <option value={'confirmed'}><input type="checkbox" /><span>Confirmed</span></option>
                        <option value={'cancelled'}><input type="checkbox" /><span>Cancelled</span></option>
                        <option value={'rejected'}><input type="checkbox" /><span>Rejected</span></option>
                    </select>
                </div>
            </div>
        </div>
        <div className="dashboardBookingBody">
            {data?.result?.map((booking, index) => (
                <BookingCard booking={booking} key={index} />
            ))}
        </div>
        <Paginate handlePageClick={handlePageClick} pageCount={data?.pageCount}  />
    </div>
  )
}

export default DashboardBooking