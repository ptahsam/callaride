import { useLocation, useNavigate } from "react-router-dom"
import "./singleListing.css"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { getDatesInRange, getModel } from "../utils/helper"
import { SearchContext } from "../../contexts/SearchContext"

const SingleListing = () => {

  const navigate = useNavigate()  

  const { city, car_type, dates } = useContext(SearchContext)

  console.log(dates)

  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const [listing, setListing] = useState()
  const [carBrand, setCarBrand] = useState('')
  const [carModel, setCarModel] = useState('')
  const [loading, setLoading] = useState(true)
  const [photoIndex, setPhotoIndex] = useState({min: 0, max: 4});
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [activeSpec, setActiveSpec] = useState(0)
  const [activePricing, setActivePricing] = useState('hourly_booking')
  const [pricing, setPricing] = useState('');
  const [newDates, setNewDates] = useState({ startDate : new Date(), endDate : new Date() })
  const [dateRange, setDateRange] = useState('');

  useEffect(() => {
    const fetchListing = async () => {
        setLoading(true)
       if(id){
            const allRes =  await axios.get(`/listings/find/${id}`)
            fetchCarBrand(allRes.data)
            fetchPricing(allRes.data, 'hourly_booking')
            setListing(allRes.data)
       }
       setLoading(false)
    }
    fetchListing();
  }, [id]);

  useEffect(() => {
    if(listing){
        fetchPricing(listing, activePricing)
    }
  }, [activePricing])

  const fetchCarBrand = async (data) => {
    const allRes =  await axios.get(`/brand/find/${data.carBasicInfo.carBrand}`)
    fetchCarModel(data, allRes.data)
    setCarBrand(allRes.data)
  }

  const fetchCarModel = async (data, brand) => {
    const brandModel = brand.models.filter((model) => model._id === data.carBasicInfo.carModel)
    setCarModel(brandModel)
  }

  const handlePrev = () => {
    if(activePhotoIndex > 0){
        setActivePhotoIndex((prev) => (prev - 1))
    }

    if(photoIndex.min > 0){
        setPhotoIndex((prev) => ({min: (prev.min - 1), max: (prev.max - 1)}))
    }
  }

  const handleNext = () => {
    if(activePhotoIndex >= 0 && activePhotoIndex < (listing.carPhotos.length - 1)){
        setActivePhotoIndex((prev) => (prev + 1))
    }

    if(photoIndex.max >= 4 && photoIndex.max < listing.carPhotos.length){
        setPhotoIndex((prev) => ({min: (prev.min + 1), max: (prev.max + 1)}))
    }
  }


  const fetchPricing = (data, rate) => {
    if(rate === 'hourly_booking'){
        setPricing(data.carPricing.hourly_booking)
    }
    if(rate === 'daily_booking'){
        setPricing(data.carPricing.daily_booking)
    }
    if(rate === 'weekly_booking'){
        setPricing(data.carPricing.weekly_booking)
    }
    if(rate === 'monthly_booking'){
        setPricing(data.carPricing.monthly_booking)
    }
  }  

  const handlePickup = (e) => {
    setNewDates((prev) => ({ ...prev, ['startDate'] : new Date(e.target.value)}))
  }

  const handleDrop = (e) => {
    setNewDates((prev) => ({ ...prev, ['endDate'] : new Date(e.target.value)}))
  }

  const handleBooking = () => {
    navigate("/listings/confirm", { state: { listing, newDates, dateRange }})
  }

  useEffect(() => {
    setDateRange(getDatesInRange(newDates.startDate, newDates.endDate))
  }, [newDates]);

  return (
    <div className="singleListing">
        {loading ? 
        <>
            <p>Loading</p>
        </>:(<>
            <div className="singleListingContainer">
                <div className="singleListingTitle">
                    <span className="listingTitle">
                        {listing.carBasicInfo.carName}
                    </span>
                    <span className="listingLocation">
                        {listing.carBasicInfo.city}
                    </span>
                    <span className="listingRating">
                        <i class='bx bx-star'></i>
                        <i class='bx bx-star'></i>
                        <i class='bx bx-star'></i>
                        <i class='bx bx-star'></i>
                        <i class='bx bx-star'></i>
                    </span>
                </div>
                <div className="singleListingBody">
                    <div className="singleListingDetails">
                        <div className="listingPhotosContainer">
                            <div className="listingPhotosActive">
                                <img src={listing.carPhotos[activePhotoIndex]} alt={listing.carBasicInfo.carName}/>
                                <div className="listingPhotosACtiveNavs">
                                    <span className="NavItem" onClick={(e) => handlePrev()}>
                                        <i class='bx bx-chevron-left'></i>
                                    </span>
                                    <span className="NavItem" onClick={(e) => handleNext()}>
                                        <i class='bx bx-chevron-right'></i>
                                    </span>
                                </div>
                            </div>
                            <div className="listingPhotosCourosel">
                                {listing.carPhotos.slice(photoIndex.min, photoIndex.max).map((photo, index) => (
                                    <img src={photo} key={index} alt={listing.carBasicInfo.carName}/> 
                                ))}
                            </div>
                        </div>
                        <div className="listingSpecifications">
                            <div className="specItem">
                                <span className="specItemTitle">
                                    Description
                                </span>
                                <div className="specItemDesc">
                                    <p>
                                        {listing.carDesc.desc}
                                    </p>
                                </div>
                            </div>
                            <div className="specItem">
                                <div className="specItemHeader">
                                    <span 
                                        className={activeSpec == 0?"active":""}
                                        onClick={(e) => setActiveSpec(0)}
                                    >Overview</span>
                                    <span 
                                        className={activeSpec == 1?"active":""}
                                        onClick={(e) => setActiveSpec(1)}
                                    >Specs & Features</span>
                                    <span 
                                        className={activeSpec == 2?"active":""}
                                        onClick={(e) => setActiveSpec(2)}
                                    >Reviews</span>
                                </div>
                                <div className={activeSpec == 0?"specBody":"specBody no-show"}>
                                    <span className="specTitle">Car Overview</span>
                                    <div className="overview">
                                        <div className="overviewItem">
                                            <div className="overviewItemSpec">
                                                <i class='bx bx-map'></i>
                                                <span>City</span>
                                            </div>
                                            <span className="title">{listing.carBasicInfo.city}</span>
                                        </div>
                                        <div className="overviewItem">
                                            <div className="overviewItemSpec">
                                                <i class='bx bxs-car'></i>
                                                <span>Car Brand</span>
                                            </div>
                                            <span className="title">{carBrand.name}</span>
                                        </div>
                                        <div className="overviewItem">
                                            <div className="overviewItemSpec">
                                                <i class='bx bxs-car'></i>
                                                <span>Car Model</span>
                                            </div>
                                            <span className="title">{carModel?carModel[0].model_name:""}</span>
                                        </div>
                                        <div className="overviewItem">
                                            <div className="overviewItemSpec">
                                                <i class='bx bxs-car'></i>
                                                <span>Car Type</span>
                                            </div>
                                            <span className="title">{listing.carBasicInfo.carType}</span>
                                        </div>
                                        <div className="overviewItem">
                                            <div className="overviewItemSpec">
                                                <i class='bx bxs-calendar' ></i>
                                                <span>Year</span>
                                            </div>
                                            <span className="title">{listing.carBasicInfo.year}</span>
                                        </div>
                                        <div className="overviewItem">
                                            <div className="overviewItemSpec">
                                                <i class='bx bx-registered' ></i>
                                                <span>Registration</span>
                                            </div>
                                            <span className="title">{listing.carBasicInfo.regNo}</span>
                                        </div>
                                        <div className="overviewItem">
                                            <div className="overviewItemSpec">
                                                <i class='bx bxs-car'></i>
                                                <span>Transmission</span>
                                            </div>
                                            <span className="title">{listing.carSpecs.transmissionType}</span>
                                        </div>
                                        <div className="overviewItem">
                                            <div className="overviewItemSpec">
                                                <i class='bx bxs-calendar' ></i>
                                                <span>Fuel Type</span>
                                            </div>
                                            <span className="title">{listing.carSpecs.fuelType}</span>
                                        </div>
                                        <div className="overviewItem">
                                            <div className="overviewItemSpec">
                                                <i class='bx bx-registered' ></i>
                                                <span>Mileage</span>
                                            </div>
                                            <span className="title">{`${listing.carSpecs.mileage}/km`}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={activeSpec == 1?"specBody":"specBody no-show"}>
                                    <span className="specTitle">Car Specs & Features</span>
                                    <div className="overview">
                                        <div className="overviewItem">
                                            <div className="overviewItemSpec">
                                                <i class='bx bx-map'></i>
                                                <span>Transmission</span>
                                            </div>
                                            <span className="title">{listing.carSpecs.transmissionType}</span>
                                        </div>
                                        <div className="overviewItem">
                                            <div className="overviewItemSpec">
                                                <i class='bx bxs-car'></i>
                                                <span>Fuel Type</span>
                                            </div>
                                            <span className="title">{listing.carSpecs.fuelType}</span>
                                        </div>
                                        <div className="overviewItem">
                                            <div className="overviewItemSpec">
                                                <i class='bx bxs-car'></i>
                                                <span>Doors</span>
                                            </div>
                                            <span className="title">{listing.carSpecs.doors}</span>
                                        </div>
                                        <div className="overviewItem">
                                            <div className="overviewItemSpec">
                                                <i class='bx bxs-car'></i>
                                                <span>Safety Amenities</span>
                                            </div>
                                            <span className="title">{listing.carSpecs.safetyAmenity}</span>
                                        </div>
                                        <div className="overviewItem">
                                            <div className="overviewItemSpec">
                                                <i class='bx bxs-calendar' ></i>
                                                <span>Infortainment</span>
                                            </div>
                                            <span className="title">{listing.carSpecs.entertainmentAmenity}</span>
                                        </div>
                                        <div className="overviewItem">
                                            <div className="overviewItemSpec">
                                                <i class='bx bx-registered' ></i>
                                                <span>Powerlock</span>
                                            </div>
                                            <span className="title">{listing.carSpecs.powerLock}</span>
                                        </div>
                                        <div className="overviewItem">
                                            <div className="overviewItemSpec">
                                                <i class='bx bxs-car'></i>
                                                <span>Seats</span>
                                            </div>
                                            <span className="title">{listing.carSpecs.seatingCapacity}</span>
                                        </div>
                                        <div className="overviewItem">
                                            <div className="overviewItemSpec">
                                                <i class='bx bxs-calendar' ></i>
                                                <span>Air Bags</span>
                                            </div>
                                            <span className="title">{listing.carSpecs.airBags}</span>
                                        </div>
                                        <div className="overviewItem">
                                            <div className="overviewItemSpec">
                                                <i class='bx bx-registered' ></i>
                                                <span>Mileage</span>
                                            </div>
                                            <span className="title">{`${listing.carSpecs.mileage}/km`}</span>
                                        </div>
                                        <div className="overviewItem">
                                            <div className="overviewItemSpec">
                                                <i class='bx bx-registered' ></i>
                                                <span>Tank Capacity</span>
                                            </div>
                                            <span className="title">{`${listing.carSpecs.tankCapacity} litres`}</span>
                                        </div>
                                        <div className="overviewItem">
                                            <div className="overviewItemSpec">
                                                <i class='bx bx-registered' ></i>
                                                <span>Child Seats</span>
                                            </div>
                                            <span className="title">{listing.carSpecs.childSeats}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={activeSpec == 2?"specBody pickUp no-show":"specBody pickUp"}>
                                    <span className="specTitle">
                                        Pickup Location
                                    </span>
                                    <div className="pickupContainer">
                                        <div className="overviewItem">
                                            <i class='bx bxs-map'></i>
                                            <div className="overviewItemSpec">
                                                <span>{`${listing.carPickUpAddress.city}, ${listing.carPickUpAddress.street_address}`}</span>
                                                <span>{listing.carPickUpAddress.zipcode}</span>
                                            </div>
                                        </div>
                                        <div className="desc">
                                            <span className="descTitle">How to get there?</span>
                                            <p>{listing.carPickUpAddress.address_desc}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={activeSpec == 2?"specBody cancellation no-show":"specBody cancellation"}>
                                    <span className="specTitle">
                                        Cancellation Details
                                    </span>
                                    <div className="cancellationContainer">
                                        <span>Cancellation Policy : <b>{listing.carCancellationPolicy.cancellation_policy}</b></span>
                                        <span>Cancellation Percentage : <b>{`${listing.carCancellationPolicy.return_amount}%`}</b> of total with security deposit</span>
                                        <p><b>NB:</b>{listing.carCancellationPolicy.desc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="singleListingBooking">
                        <div className="singleListingPricing">
                            <div className="pricingRates">
                                <span 
                                    className={activePricing === 'hourly_booking'?"active":""}
                                    onClick={(e)=>setActivePricing('hourly_booking')}
                                >Hourly</span>
                                <span 
                                    className={activePricing === 'daily_booking'?"active":""}
                                    onClick={(e)=>setActivePricing('daily_booking')}
                                >Daily</span>
                                <span 
                                    className={activePricing === 'weekly_booking'?"active":""}
                                    onClick={(e)=>setActivePricing('weekly_booking')}
                                >Weekly</span>
                                <span 
                                    className={activePricing === 'monthly_booking'?"active":""}
                                    onClick={(e)=>setActivePricing('monthly_booking')}
                                >Monthly</span>
                            </div>
                            <div className="pricingDetails">
                                <div className="pricingHeader">
                                    <span className="currency">kes</span>
                                    <div className="priceContainer">
                                        <h3 className="amount">
                                            {pricing?activePricing === 'hourly_booking'?pricing.price_per_hour:"":""}
                                            {pricing?activePricing === 'daily_booking'?pricing.price_per_day:"":""}
                                            {pricing?activePricing === 'weekly_booking'?pricing.price_per_week:"":""}
                                            {pricing?activePricing === 'monthly_booking'?pricing.price_per_month:"":""}
                                        </h3>
                                        <p className="rate">
                                            {activePricing === 'hourly_booking'?"per hour":""}
                                            {activePricing === 'daily_booking'?"per day":""}
                                            {activePricing === 'weekly_booking'?"per week":""}
                                            {activePricing === 'monthly_booking'?"per month":""}
                                        </p>
                                    </div>
                                </div>
                                <div className="pricingBody">
                                    <div className="pricingBodyDetails">
                                        <div className="inputDateContainer">
                                            <label>Pick up Date</label>
                                            <div className="inputDate">
                                                <input 
                                                    type="datetime-local" 
                                                    onChange={(e) => handlePickup(e)} 
                                                    placeholder="Drop Date" 
                                                    
                                                />
                                            </div>
                                        </div>
                                        <div className="inputDateContainer">
                                            <label>Drop Date</label>
                                            <div className="inputDate">
                                                <input type="datetime-local" onChange={(e) => handleDrop(e)} placeholder="Drop Date"/>
                                            </div>
                                        </div>
                                        <div className="inputDatePricing">
                                            <div className="priceItem has-border">
                                                <span className="securityDeposit">Security Deposit</span>
                                                <span className="depositValue">{listing.carPricing.securityDeposit}</span>
                                            </div>
                                            <div className="priceItem has-border">
                                                <span className="pricingRate">
                                                    <span className="rating">
                                                        {activePricing === 'hourly_booking'?"Hourly":""}
                                                        {activePricing === 'daily_booking'?"Daily":""}
                                                        {activePricing === 'weekly_booking'?"Weekly":""}
                                                        {activePricing === 'monthly_booking'?"Monthly":""}
                                                    </span>
                                                    <span className="count">
                                                        {dateRange.length}
                                                    </span>
                                                    <i class='bx bx-x'></i>
                                                    <span className="rate">
                                                        {pricing?activePricing === 'hourly_booking'?pricing.price_per_hour:"":""}
                                                        {pricing?activePricing === 'daily_booking'?pricing.price_per_day:"":""}
                                                        {pricing?activePricing === 'weekly_booking'?pricing.price_per_week:"":""}
                                                        {pricing?activePricing === 'monthly_booking'?pricing.price_per_month:"":""}
                                                    </span>
                                                </span>
                                                <span>
                                                    {pricing?activePricing === 'hourly_booking'?pricing.price_per_hour * dateRange.length:"":""}
                                                    {pricing?activePricing === 'daily_booking'?pricing.price_per_day * dateRange.length:"":""}
                                                    {pricing?activePricing === 'weekly_booking'?pricing.price_per_week * dateRange.length:"":""}
                                                    {pricing?activePricing === 'monthly_booking'?pricing.price_per_month * dateRange.length:"":""}
                                                </span>
                                            </div>
                                            <div className="priceItem">
                                                <span className="totalLabel">Total</span>
                                                <span className="totalAmount">
                                                    {pricing?activePricing === 'hourly_booking'?((pricing.price_per_hour * dateRange.length) + listing.carPricing.securityDeposit):"":""}
                                                    {pricing?activePricing === 'daily_booking'?((pricing.price_per_day * dateRange.length) + listing.carPricing.securityDeposit):"":""}
                                                    {pricing?activePricing === 'weekly_booking'?((pricing.price_per_week * dateRange.length) + listing.carPricing.securityDeposit):"":""}
                                                    {pricing?activePricing === 'monthly_booking'?((pricing.price_per_month * dateRange.length) + listing.carPricing.securityDeposit):"":""}  
                                                </span>
                                            </div>
                                        </div>
                                        <div className="inputPricingButtons">
                                            <span className="instantPay">Instant Pay</span>
                                            <span className="bookNow" onClick={() => handleBooking()}>Book Now</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)}
        
    </div>
  )
}

export default SingleListing