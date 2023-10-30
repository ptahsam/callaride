import { useNavigate } from "react-router-dom"
import "./listingCard.css"
import { useEffect, useState } from "react"
import axios from "axios"

const Listing = ({ listing }) => {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])


  useEffect(() => {
    const fetchBookings = async () => {
      const allBookings =  await axios.get(`/bookings?listingid=${listing._id}`)
      setBookings(allBookings.data)
    }
    fetchBookings();
  }, [listing])

  return (
    <div className="listingCard">
        <div className="listingImage">
            <img src={listing.carPhotos[0]} />
            <span className={listing.approvalStatus === "submitted_for_review"?"status review":listing.approvalStatus === "approved"?"status approved":"status rejected"}>
                <i class='bx bxs-circle'></i>
                <small>{listing.approvalStatus === "submitted_for_review"?"In Review":listing.approvalStatus === "approved"?"Active":"Rejected"}</small>
            </span>
        </div>
        <div className="listingDetails">
          <div className="listingInfo">
            <div className="listingInfoHeader">
              <span className="carTitle">
                {listing.carBasicInfo.carName}
              </span>
              <div className="listingInfoHeaderAction">
                <span className={listing.carCalendarSchedule.status === "available"?"status available":listing.carCalendarSchedule.status === "booked"?"status booked":"status unavailable"}>{listing.carCalendarSchedule.status}</span>
                <div className="vDiv"></div>
                <span className="viewListing" onClick={() => navigate(`/listings/${listing._id}`)}>
                  View on website
                </span>
              </div>
            </div>
            <div className="listingInfoBody">
              <span className="listingInfoBodyItem rating">
                <i class='bx bxs-star'></i>
                <span>3.5(45 Reviews)</span>
              </span>
              <span className="listingInfoBodyItem booking">
                <i class='bx bxs-calendar-check'></i>
                <span>{`${bookings?.length} Bookings`}</span>
              </span>
              <span className="listingInfoBodyItem view">
                <i class='bx bxs-show'></i>
                <span>{`${listing.viewCount} Views`}</span>
              </span>
            </div>
          </div>
          <div className="listingActions">
            <span className="boost">Boost</span>
            <span className="manage">Manage</span>
            <span className="price_per_hour">{`KES ${listing.carPricing.hourly_booking.price_per_hour}/Hour`}</span>
          </div>
        </div>
    </div>
  )
}

export default Listing