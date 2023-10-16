import { useContext, useState } from "react"
import "./confirm.css"
import { AuthContext } from "../../contexts/AuthContext"
import { months } from "../utils/numbers"
import { useLocation } from "react-router-dom"
import { format, parseISO } from "date-fns"

const Confirm = () => {

  const  { user } = useContext(AuthContext) 

  const location = useLocation()
  const [car, setCarInfo] = useState(location.state?.listing || null)
  const [dates, setDates] = useState(location.state?.newDates || null)
  const [range, setRange] = useState(location.state?.dateRange || null)

  console.log(dates)

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
                                <i class='bx bxs-star' ></i>
                                <i class='bx bxs-star' ></i>
                                <i class='bx bxs-star' ></i>
                                <i class='bx bxs-star' ></i>
                                <i class='bx bxs-star' ></i>
                            </span>
                            <span className="ratingCount">0 Reviews</span>
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
                            <input type="text" value={`${user.firstname} ${user.lastname}`}/>
                        </div>
                        <div className="bookingUserItem">
                            <span className="userItemTitle">Phone number</span>
                            <input type="text" value={`${user.phonenumber}`}/>
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
            </div>
        </div>
    </div>
  )
}

export default Confirm