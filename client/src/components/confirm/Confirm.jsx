import { useContext, useState } from "react"
import "./confirm.css"
import { AuthContext } from "../../contexts/AuthContext"
import { months } from "../utils/numbers"
import { useLocation } from "react-router-dom"
import { format, parseISO } from "date-fns"
import axios from "axios"
import { createRatingStars, getAverageRating } from "../utils/helper"

const Confirm = () => {

  const  { user } = useContext(AuthContext) 

  const location = useLocation()
  const [car, setCarInfo] = useState(location.state?.listing || null)
  const [dates, setDates] = useState(location.state?.newDates || null)
  const [range, setRange] = useState(location.state?.dateRange || null)
  const [reviews, setReviews] = useState(location.state?.reviews || [])
  const [saving, setIsSubmitting] = useState(false);

  const handleBookingBtn = async () => {
    setIsSubmitting(true)
    const booking = {
        user_id: user._id,
        listing_owner_id: car.listingOwner,
        listing_id: car?._id,
        dates: range,
        start_date: dates?.startDate,
        end_date: dates?.endDate,
        payment: {
            security_deposit: {
                amount: car.carPricing.securityDeposit,
                status: "unpaid",
            },
            service_fee: {
                amount: (car.carPricing.daily_booking.price_per_day * range.length) * 0.1,
                status: "unpaid",
            },
            charge: {
                amount: car.carPricing.daily_booking.price_per_day * range.length,
                status: "unpaid",
            },
        },
        status: "unpaid",
        approval_status: "awaiting_confirmation"
    }

    try{
        const resp = await axios.post("/bookings", booking);
        if(resp){
            setIsSubmitting(false)
            console.log(resp.data)
        }
    }catch(err){
        setIsSubmitting(false)
        console.log(err)
    }
  }

  return (
    <div className="confirm">
        <div className="confirmContainer">
            <div className="confirmBookingDetails">
                <div className="carBookingDetails">
                    <div className="carDetails">
                        <span className="carDetailsTitle">
                            {car?.carBasicInfo.carName}
                        </span>
                        <span className="carDetailsLocation">
                            {car?.carBasicInfo.city}
                        </span>
                        <div className="carDetailsRating">
                            <span className="rating">
                            {createRatingStars(getAverageRating(reviews)).map((rating, index) => (
                                <i className={rating} key={index}></i>
                            ))}
                            </span>
                            <span className="ratingCount">
                                {`${getAverageRating(reviews)} (${reviews?.length} ${reviews?.length > 1?"Reviews":"Review"})`}
                            </span>
                        </div>
                    </div>
                    <div className="carImage">
                        <img src={car.carPhotos[0]} title={car?.carBasicInfo.carName} />
                    </div>
                </div>
                <div className="carBookingDates">
                    <i class='bx bx-calendar'></i>
                    <span className="carDates">
                        {format(parseISO(new Date(dates?.startDate).toISOString()), "MMMM dd, yyyy")} — {format(parseISO(new Date(dates?.endDate).toISOString()), "MMMM dd, yyyy")}
                    </span>
                </div>
                <div className="carBookingPricing">
                    <div className="carBookingPricingItem">
                        <span className="itemTitle">{`Booking for ${range.length} Days`}</span>
                        <span className="itemPrice">{`${car.carPricing.daily_booking.price_per_day * range.length}`}</span>
                    </div>
                    <div className="carBookingPricingItem">
                        <span className="itemTitle">Service fee</span>
                        <span className="itemPrice">{`Kes. ${(car.carPricing.daily_booking.price_per_day * range.length) * 0.1}`}</span>
                    </div>
                    <div className="carBookingPricingItem">
                        <span className="itemTitle">Security deposit</span>
                        <span className="itemPrice">{`Kes. ${car.carPricing.securityDeposit}`}</span>
                    </div>
                </div>
                <div className="carBookingTotal">
                    <span className="totals">Total(KES)</span>
                    <span className="totalAmount">{`${(car.carPricing.daily_booking.price_per_day * range.length) + 
                        ((car.carPricing.daily_booking.price_per_day * range.length) * 0.1) + (car.carPricing.securityDeposit)}`}</span>
                </div>
                <div className="carBookingPolicy">
                    <p>You can Cancel Your trip untill before 1 days from Check in Date..!</p>
                </div>
            </div>
            <div className="confirmBookingUser">
                <div className="confirmBookingUserContainer">
                    <div className="bookingUserHeader">
                        <span className="title">Driving Details</span>
                    </div>
                    <div className="bookingUserBody">
                        <div className="bookingUserItem">
                            <span className="userItemTitle">Name</span>
                            <input type="text" value={`${user.firstname} ${user.lastname}`}/>
                        </div>
                        <div className="bookingUserItem">
                            <span className="userItemTitle">Age</span>
                            <input type="text" value={`${user.birthdate}`}/>
                        </div>
                        <div className="bookingUserItem">
                            <span className="userItemTitle">Phone number</span>
                            <input type="text" value={`+254${user.phonenumber}`}/>
                        </div>
                        <div className="bookingUserItem">
                            <span className="userItemTitle">Email</span>
                            <input type="text" value={`${user.email}`}/>
                        </div>
                        <div className="bookingUserItem">
                            <span className="userItemTitle">License Number</span>
                            <input type="text" value={`${user.email}`}/>
                        </div>
                        <div className="bookingUserItem">
                            <span className="userItemTitle">Licence Expiry <br /> Month</span>
                            <div className="selectContainer">
                                <select>
                                    <option>Month</option>
                                    {months.map((month, index) => (
                                        <option value={month} key={index}>{`${month}`}</option>
                                    ))}
                                </select>
                                <select>
                                    <option>Year</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="confirmBookingActions">
                    <span className="btnSubmitBooking" onClick={(e) => handleBookingBtn()}>
                        {saving?"Booking":"Book"}
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Confirm