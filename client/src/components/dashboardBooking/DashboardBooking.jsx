import { useContext, useEffect, useState } from "react"
import "./dashboardBooking.css"
import { AuthContext } from "../../contexts/AuthContext"
import useFetch from "../../hooks/useFetch"
import BookingCard from "../cards/bookingCard/BookingCard"
import "../paginate/paginate.css"
import Paginate from "../paginate/Paginate"
import axios from "axios"

const DashboardBooking = ({ activeItem, listingid }) => {

  const  { user } = useContext(AuthContext)

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(1)
  const [listings, setListings] = useState([])
  const [bookingStatus, setBookingStatus] = useState('');
  const [selectedListing, setSelectedListing] = useState('')
  const [dates, setDates] = useState({ startDate: new Date("2023-01-01"), endDate: new Date() })
  const { data, loading, error } = useFetch(`/bookings/paginated?owner=${user?._id}&listingid=${selectedListing}&approvalstatus=${bookingStatus}&start=${dates.startDate}&end=${dates.endDate}&page=${page}&limit=${limit}`)

  const handlePageClick = (e) => {
    setPage(e.selected + 1)
  }

  useEffect(() => {
    setSelectedListing(listingid)
  },[listingid]);

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

  const handleDatesChange = (e) => {
    setDates((prev) => ({ ...prev, [e.target.id]: e.target.value}));
  }

  console.log(listingid)

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
                    <input type="datetime-local" id='startDate' onChange={handleDatesChange} value={dates.startDate}/>
                    <span className="vDiv"></span>
                    <input type="datetime-local" id='endDate' onChange={handleDatesChange} value={dates.endDate}/>
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
                <div className="dashboardBookingItem number">
                    <input type="number" min={1} onChange={(e) => setLimit(e.target.value)} value={limit}/>
                </div>
            </div>
        </div>
        <div className="dashboardBookingBody">
            {loading?<p className="loading">Loading please wait</p>:data?.result?.length > 0?data?.result?.map((booking, index) => (
                <BookingCard booking={booking} key={index} />
            )):<p className="no-data">No bookings found</p>}
        </div>
        <Paginate handlePageClick={handlePageClick} pageCount={data?.pageCount}  />
    </div>
  )
}

export default DashboardBooking