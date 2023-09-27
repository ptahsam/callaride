import "./listCarForm.css"
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { format } from "date-fns"
import { useState, useEffect } from "react";
import { activeTabsObj } from "../utils/listing";

const ListCarForm = () => {

  const [dates, setDates] = useState([{startDate: new Date(), endDate: new Date(), key: "selection"}]);  
  const [carAvailability, setCarAvailability] = useState("");
  const [dailyBooking, setDailyBooking] = useState(false);
  const [hourlyBooking, setHourlyBooking] = useState(false);
  const [activeTabs, setActiveTabs] = useState(JSON.parse(localStorage.getItem("activeTabs")) || {'mainTab': 1, 'subTab': 1});

  const handleDailyBooking = (e) => {
    if(e.target.checked){
        setDailyBooking(true)
    }else{
        setDailyBooking(false)
    }
  }

  const handleHourlyBooking = (e) => {
    if(e.target.checked){
        setHourlyBooking(true)
    }else{
        setHourlyBooking(false)
    }
  }

  const handleCarAvailability = (e) => {
    if(carAvailability === e.target.value){
        setCarAvailability('')
    }else{
        setCarAvailability(e.target.value)
    }
  }

  const handleNext = () => {
    if(activeTabs.mainTab == 1 && activeTabs.subTab == 1){
        setActiveTabs({
            'mainTab': 1,
            'subTab': 2
        });
        saveActiveTabs({'mainTab': 1,'subTab': 2})
    }

    if(activeTabs.mainTab == 1 && activeTabs.subTab == 2){
        setActiveTabs({
            'mainTab': 1,
            'subTab': 3
        });
        saveActiveTabs({'mainTab': 1,'subTab': 3})
    }

    if(activeTabs.mainTab == 1 && activeTabs.subTab == 3){
        setActiveTabs({
            'mainTab': 2,
            'subTab': 1
        });
        saveActiveTabs({'mainTab': 2,'subTab': 1});
    }
  }

  const handlePrev = () => {
    if(activeTabs.mainTab == 1 && activeTabs.subTab == 2){
        setActiveTabs({
            'mainTab': 1,
            'subTab': 1
        });
        saveActiveTabs({'mainTab': 1,'subTab': 1});
    }

    if(activeTabs.mainTab == 1 && activeTabs.subTab == 3){
        setActiveTabs({
            'mainTab': 1,
            'subTab': 2
        });
        saveActiveTabs({'mainTab': 1,'subTab': 2});
    }

    if(activeTabs.mainTab == 2 && activeTabs.subTab == 1){
        setActiveTabs({
            'mainTab': 1,
            'subTab': 3
        });
        saveActiveTabs({'mainTab': 1,'subTab': 3});
    }
  }

  const saveActiveTabs = (tabs) => {
    localStorage.setItem("activeTabs", JSON.stringify(tabs));
  }

  return (
    <div className="listCarForm">
        <div className="listCarFormContainer">
            <div className="listCarFormIntro">
                <span>Trade your car</span>
                <h1>List your <br />vehycle</h1>
                <p>
                    Interested in trading in your current vehicle? <br />
                    It would probably be good to have an estimate <br /> 
                    of what it’s worth first. After all, trading in a <br />
                    vehicle is a lot less hassle than selling it <br />
                    yourself. And you can often lower your <br />
                    payments by trading in a vehicle as well. Win-win!
                </p>
            </div>
            <div className="listCarDetails">
                <div className="listCarHeader">
                    <div className={activeTabs.mainTab == 1?"listCarHeaderItem active":"listCarHeaderItem"}>
                        <span className="step">
                            01
                        </span>
                        <h3>Basic Info</h3>
                        <span className="desc">
                            Add your vehycle details
                        </span>
                    </div>
                    <div className={activeTabs.mainTab == 2?"listCarHeaderItem active":"listCarHeaderItem"}>
                        <span className="step">
                            02
                        </span>
                        <h3>Description</h3>
                        <span className="desc">
                            Add vehycle description
                        </span>
                    </div>
                    <div className={activeTabs.mainTab == 3?"listCarHeaderItem active":"listCarHeaderItem"}>
                        <span className="step">
                            03
                        </span>
                        <h3>Settings</h3>
                        <span className="desc">
                            Add vehycle settings
                        </span>
                    </div>
                </div>
                <div className={activeTabs.mainTab == 1?"listCarBasicInfo":"listCarBasicInfo no-show"}>
                    <div className={activeTabs.mainTab == 1?"listCarBasicHeader":"listCarBasicHeader no-show"}>
                        <span className={activeTabs.mainTab >= 1 && activeTabs.subTab >= 1?"basics active":"basics"}>
                            <i class='bx bxs-check-circle' ></i>
                            <h3>Basics</h3>
                        </span>
                        <span className={activeTabs.mainTab >= 1 && activeTabs.subTab >= 2?"calendar active":"calendar"}>
                            <i class='bx bxs-check-circle' ></i>
                            <h3>Calendar</h3>
                        </span>
                        <span className={activeTabs.mainTab >= 1 && activeTabs.subTab >= 3?"pricing active":"pricing"}>
                            <i class='bx bxs-check-circle' ></i>
                            <h3>Pricing</h3>
                        </span>
                    </div>
                    <div className={activeTabs.mainTab == 1 && activeTabs.subTab == 1?"listCarBasicInfoForm":"listCarBasicInfoForm no-show"}>
                        <div className="listCarBasicTitle">
                            <h3>Add Basic Info</h3>
                        </div>
                        <div className="listCarBasicInfoFormDetails">
                            <div className="basicInfoFormItem">
                                <label>City<sup>*</sup></label>
                                <input type="text" placeholder="Enter your city"/>
                            </div>
                            <div className="basicInfoFormItem">
                                <label>Brand<sup>*</sup></label>
                                <select>
                                    <option>-Select Brand-</option>
                                </select>
                            </div>
                            <div className="basicInfoFormItem">
                                <label>Model<sup>*</sup></label>
                                <select>
                                    <option>-Select Model-</option>
                                </select>
                            </div>
                            <div className="basicInfoFormItem">
                                <label>Year<sup>*</sup></label>
                                <input type="text" placeholder="Enter year"/>
                            </div>
                            <div className="basicInfoFormItem">
                                <label>Car Type<sup>*</sup></label>
                                <select>
                                    <option>-Select Car Type-</option>
                                </select>
                            </div>
                            <div className="basicInfoFormItem">
                                <label>Car Registration Number<sup>*</sup></label>
                                <input type="text" placeholder="Car Registration Number" />
                            </div>
                        </div>
                    </div>
                    <div className={activeTabs.mainTab == 1 && activeTabs.subTab == 2?"listCarBasicInfoCalendar":"listCarBasicInfoCalendar no-show"}>
                        <div className="listCarBasicTitle">
                            <h3>Mark your car availability status</h3>
                        </div>
                        <div className="listCarCalendar">
                            <DateRange 
                                editableDateInputs={true}
                                onChange={item=>setDates([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dates} 
                                rangeColors={['#ae0c5c', '#33334f', '#f0f5fb']}
                                className="listCarCalendarPicker"
                            />
                            <div className="listCarCalendarStatus">
                                <span className="listCarCalendarTitle">Set car availability</span>
                                <label className="radioBtn available">
                                    Available
                                    <input type="checkbox" 
                                        onChange={handleCarAvailability} 
                                        checked={carAvailability === "available"?true:false} 
                                        value="available"
                                    />
                                    <span class="checkmark"></span>
                                </label>
                                <label className="radioBtn booked">
                                    Booked
                                    <input type="checkbox" 
                                        onChange={handleCarAvailability} 
                                        checked={carAvailability === "booked"?true:false}
                                        value="booked"
                                    />
                                    <span class="checkmark"></span>
                                </label>
                                <label className="radioBtn unavailable">
                                    Unavailable
                                    <input type="checkbox" 
                                        onChange={handleCarAvailability} 
                                        value="unavailable"
                                        checked={carAvailability === "unavailable"?true:false}
                                    />
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={activeTabs.mainTab == 1 && activeTabs.subTab == 3?"listCarBasicInfoPricing":"listCarBasicInfoPricing no-show"}>
                        <div className="listCarBasicTitle">
                            <h3>Base Price</h3>
                        </div>
                        <div className="listCarBasicInfoPricingDetails">
                            <div className="listCarBasicInfoFormDetails">
                                <div className="basicInfoFormItem">
                                    <label>Currency<sup>*</sup></label>
                                    <select>
                                        <option>-Select Currency-</option>
                                    </select>
                                </div>
                                <div className="basicInfoFormItem">
                                    <label>Security Deposit<sup>*</sup></label>
                                    <input type="number" placeholder="Enter price i.e 70"/>
                                </div>
                            </div>
                            <div className="listCarBasicInfoFormDetails">
                                <div className="basicInfoFormItemCustomCheckBox">
                                    <input type="checkbox" onChange={(e) => handleHourlyBooking(e)}/>
                                    <label>Hourly Booking<sup>*</sup></label>
                                </div>
                                <div className="basicInfoFormItemCustomCheckBox">
                                    <input type="checkbox" onChange={(e) => handleDailyBooking(e)}/>
                                    <label>Daily Booking<sup>*</sup></label>
                                </div>
                            </div>
                            <div className={hourlyBooking?"listCarBasicInfoFormBooking":"listCarBasicInfoFormBooking no-show"}>
                                <h3>Hourly Booking</h3>
                                <div className="listCarBasicInfoFormDetails">
                                    <div className="basicInfoFormItem">
                                        <label>Minimum Hours<sup>*</sup></label>
                                        <select>
                                            <option>-Select Min Hours-</option>
                                        </select>
                                    </div>
                                    <div className="basicInfoFormItem">
                                        <label>Minimum Hour Price<sup>*</sup></label>
                                        <input type="number" placeholder="Minimum hour price"/>
                                    </div>
                                    <div className="basicInfoFormItem">
                                        <label>Price per Hour<sup>*</sup></label>
                                        <input type="number" placeholder="Price per hour"/>
                                    </div>
                                </div>
                            </div>
                            <div className={dailyBooking?"listCarBasicInfoFormBooking":"listCarBasicInfoFormBooking no-show"}>
                                <h3>Daily Booking</h3>
                                <div className="listCarBasicInfoFormDetails">
                                    <div className="basicInfoFormItem">
                                        <label>Minimum Days<sup>*</sup></label>
                                        <select>
                                            <option>-Select min days-</option>
                                        </select>
                                    </div>
                                    <div className="basicInfoFormItem">
                                        <label>Price Per Price<sup>*</sup></label>
                                        <input type="number" placeholder="0.00"/>
                                    </div>
                                    <div className="basicInfoFormItem">
                                        <label>Weekly Price<sup>*</sup></label>
                                        <input type="number" placeholder="Weekly price"/>
                                    </div>
                                    <div className="basicInfoFormItem">
                                        <label>Monthly Price<sup>*</sup></label>
                                        <input type="number" placeholder="0.00"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className={activeTabs.mainTab == 2?"listCarDescription":"listCarDescription no-show"}>
                    <div className="listCarDescriptionHeader">
                        <span className={activeTabs.mainTab >= 2 && activeTabs.subTab >= 1?"overview active":"overview"}>
                            <i class='bx bxs-check-circle' ></i>
                            <h3>Overview</h3>
                        </span>
                        <span className={activeTabs.mainTab >= 2 && activeTabs.subTab >= 2?"photos active":"photos"}>
                            <i class='bx bxs-check-circle' ></i>
                            <h3>Photos</h3>
                        </span>
                    </div>
                    <div className="listCarDescriptionOverviewForm">
                        <div className="listCarBasicTitle">
                            <h3>Overview</h3>
                        </div>
                        <div className="listCarDescriptionOverviewFormDetails">
                            <div className="basicInfoFormItem">
                                <label>Summary<sup>*</sup><span>Maximum 150 words</span></label>
                                <textarea rows={5} placeholder="Enter your description"/>
                            </div>
                            <div className="listCarDescriptionOverviewFormDetailsItem">
                                <span className="item requestBook">
                                    Request to Book 
                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                    </label>
                                </span>
                                <span className="item instantPay">
                                    Instant Pay 
                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                    </label>
                                </span>
                            </div>
                            <div className="listCarDescriptionOverviewFormNote">
                                <span>
                                    <b>Note:</b>
                                    Current Status Enabled
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="listCarDetailsBtn">
                    <span 
                        className={activeTabs.mainTab == 1 && activeTabs.subTab == 1?"basicInfoBtn no-show":"basicInfoBtn"}
                        onClick={handlePrev}
                    >
                        Prev
                    </span>
                    <span className="basicInfoBtn" onClick={handleNext}>
                        Next
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ListCarForm