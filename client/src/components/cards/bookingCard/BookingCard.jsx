import { useEffect, useState } from "react";
import "./bookingCard.css"
import axios from "axios";
import { format, parseISO } from "date-fns"

const BookingCard = ({ booking }) => {

  const [listing, setListing] = useState() 
  const [person, setPerson] = useState() 

  useEffect(() => {
    const fetchListing = async () => {
      const listing =  await axios.get(`/listings/find/${booking.listing_id}`)
      setListing(listing.data)
    }

    const fetchPerson = async () => {
        const person =  await axios.get(`/customers/find/${booking.user_id}`)
        setPerson(person.data)
      }
    fetchListing();
    fetchPerson();
  },[booking]);

  const handleBookingClick = async (id,status) => {
    const res = await axios.put(`/bookings/${id}`, { approval_status: status });
  }

  return (
    <div className="bookingCard">
        <div className="bookingCardPeople">
            <div className="bookingCardListing">
                <div className="bookingCardListingImage">
                    <img src={listing?.carPhotos[0]} />
                </div>
                <div className="bookingCardListingDetails">
                    <span className="listingName">
                        {listing?.carBasicInfo.carName}
                    </span>
                    <div className="listingRating">
                        <span className="rating">
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                            <i class='bx bxs-star'></i>
                        </span>
                        <span className="count">5.0(3 Reviews)</span>
                    </div>
                </div>
            </div>
            <div className="bookingCardPerson">
                <div className="bookingCardPersonHeader">
                    <div className="bookingCardPersonImg">
                        <img src={person?.photo != ""?person?.photo:"../../images/profile/profile.jpg"} />
                    </div>
                    <div className="bookingCardPersonTitle">
                        <span className="name">{`${person?.firstname} ${person?.lastname}`}</span>
                        <span className="verification">Verified<i class='bx bx-badge-check'></i></span>
                    </div>
                </div>
                <div className="bookingCardPersonBody">
                    <div className="bookingCardPersonBodyItem">
                        <span className="itemTitle">Email :</span>
                        <span className="itemValue">{person?.email}</span>
                    </div>
                    <div className="bookingCardPersonBodyItem">
                        <span className="itemTitle">Contact :</span>
                        <span className="itemValue">{person?.phonenumber}</span>
                    </div>
                    <div className="bookingCardPersonBodyItem">
                        <span className="itemTitle">Address :</span>
                        <span className="itemValue">{person?.address}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="bookingCardDetails">
            <div className="bookingCardDuration">
                <span className="bookingCardDurationTitle">
                    Booked for
                </span>
                <div className="bookingCardDurationBody">
                    <span className="bookingCardDurationDays">
                        {`${booking.dates.length} Days`}
                    </span>
                    <div className="bookingCardDurationBodyItems">
                        <span className="bookingDurationItem">
                            <span className="itemTitle">Starting at : </span>
                            <span className="itemValue">{format(parseISO(new Date(Date.parse(booking.start_date)).toISOString()), "MMMM dd, yyyy")}</span>
                        </span>
                        <span className="bookingDurationItem">
                            <span className="itemTitle">Ending at : </span>
                            <span className="itemValue">{format(parseISO(new Date(Date.parse(booking.end_date)).toISOString()), "MMMM dd, yyyy")}</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className="bookingCardPayments">
                <span className="bookingCardPaymentTitle">
                    Payments
                </span>
                <div className="bookingCardPaymentBody">
                    <div className="bookingCardPaymentItem hasBorder">
                        <span className="bookingCardPaymentItemName">
                            Deposit
                            <i class='bx bx-check-circle'></i>
                        </span>
                        <span className="bookingCardPaymentAmount">
                            {`kes. ${booking.payment.security_deposit.amount}`}
                            <p>(Paid)</p>
                        </span>
                    </div>
                    <div className="bookingCardPaymentItem hasBorder lPadding">
                        <span className="bookingCardPaymentItemName">
                            Service
                            <i class='bx bx-check-circle'></i>
                        </span>
                        <span className="bookingCardPaymentAmount">
                            {`kes. ${booking.payment.service_fee.amount}`}
                            <p>(Paid)</p>
                        </span>
                    </div>
                    <div className="bookingCardPaymentItem lPadding">
                        <span className="bookingCardPaymentItemName">
                            Charge
                            <i class='bx bx-check-circle'></i>
                        </span>
                        <span className="bookingCardPaymentAmount">
                            {`kes. ${booking.payment.charge.amount}`}
                            <p>(Paid)</p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div className="bookingCardActions">
            {booking.approval_status === 'awaiting_confirmation'? <>
            <span className="bookingCardActionItem confirm" onClick={() => handleBookingClick(booking._id, 'confirmed')}>
                Confirm
            </span>
            <span className="bookingCardActionItem reject" onClick={() => handleBookingClick(booking._id, 'rejected')}>
                Reject
            </span></>:<></>}
            <span className="bookingCardActionItem view">
                View all details
            </span>
        </div>
    </div>
  )
}

export default BookingCard