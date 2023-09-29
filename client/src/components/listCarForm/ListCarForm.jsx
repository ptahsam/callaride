import "./listCarForm.css"
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { format } from "date-fns"
import { useState, useEffect, useRef } from "react";
import { activeTabsObj, carSpecs } from "../utils/listing";
import { fileToDataURL } from "../utils/helper";

const ListCarForm = () => {

  const [dates, setDates] = useState([{startDate: new Date(), endDate: new Date(), key: "selection"}]);  
  const [carAvailability, setCarAvailability] = useState("");
  const [dailyBooking, setDailyBooking] = useState(false);
  const [hourlyBooking, setHourlyBooking] = useState(false);
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [carSpecifications, setCarSpecifications] = useState(carSpecs);
  const [activeTabs, setActiveTabs] = useState(JSON.parse(localStorage.getItem("activeTabs")) || {'mainTab': 1, 'subTab': 1});

  const hiddenFileInput = useRef(null);

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

  const handleCarSpecifications = (spec,e) => {
    setCarSpecifications((prev) => ({ ...prev, [spec]: e.target.value }));
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

    if(activeTabs.mainTab == 2 && activeTabs.subTab == 1){
        setActiveTabs({
            'mainTab': 2,
            'subTab': 2
        });
        saveActiveTabs({'mainTab': 2,'subTab': 2});
    }

    if(activeTabs.mainTab == 2 && activeTabs.subTab == 2){
        setActiveTabs({
            'mainTab': 3,
            'subTab': 1
        });
        saveActiveTabs({'mainTab': 3,'subTab': 1});
    }

    if(activeTabs.mainTab == 3 && activeTabs.subTab == 1){
        setActiveTabs({
            'mainTab': 3,
            'subTab': 2
        });
        saveActiveTabs({'mainTab': 3,'subTab': 2});
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

    if(activeTabs.mainTab == 2 && activeTabs.subTab == 2){
        setActiveTabs({
            'mainTab': 2,
            'subTab': 1
        });
        saveActiveTabs({'mainTab': 2,'subTab': 1});
    }

    if(activeTabs.mainTab == 3 && activeTabs.subTab == 1){
        setActiveTabs({
            'mainTab': 2,
            'subTab': 2
        });
        saveActiveTabs({'mainTab': 2,'subTab': 2});
    }

    if(activeTabs.mainTab == 3 && activeTabs.subTab == 2){
        setActiveTabs({
            'mainTab': 3,
            'subTab': 1
        });
        saveActiveTabs({'mainTab': 3,'subTab': 1});
    }
  }

  const saveActiveTabs = (tabs) => {
    localStorage.setItem("activeTabs", JSON.stringify(tabs));
  }

  // handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      // handleFiles(e.dataTransfer.files);
      if(files.length > 0){
        const uploadedFiles =  await Promise.all(Array.from(e.dataTransfer.files).map(fileToDataURL));
        const newFiles = [...files, ...uploadedFiles];
        setFiles([...new Set(newFiles)])
      }else{
        const uploadedFiles =  await Promise.all(Array.from(e.dataTransfer.files).map(fileToDataURL));
        setFiles(uploadedFiles)
      }
      
    }
  }

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleSelectFiles = async (e) => {
    if(files.length > 0){
        const uploadedFiles =  await Promise.all(Array.from(e.target.files).map(fileToDataURL));
        const newFiles = [...files, ...uploadedFiles];
        setFiles([...new Set(newFiles)])
    }else{
        if(e.target.files){
            const uploadedFiles =  await Promise.all(Array.from(e.target.files).map(fileToDataURL));
            setFiles(uploadedFiles)
        }
    }
  }

  const handleRemoveImg = (file) => {
    const newFiles = files.filter((item) => item.file !== file);
    setFiles(newFiles);
  };

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
                    <div className={activeTabs.mainTab == 2 && activeTabs.subTab == 1?"listCarDescriptionOverviewForm":"listCarDescriptionOverviewForm no-show"}>
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
                    <div className={activeTabs.mainTab == 2 && activeTabs.subTab == 2?"listCarDescriptionPhotosForm":"listCarDescriptionPhotosForm no-show"}>
                        <div className="listCarBasicTitle">
                            <h3>Add Photos</h3>
                            <span>Customers love photos that highlight the features of your car.</span>
                        </div>
                        <div className={files.length > 0?"listCarDescriptionPhotosContainer has-photos":"listCarDescriptionPhotosContainer no-photos"}>
                            {files.length > 0? 
                                <>
                                </>
                                :
                                <>
                                <label 
                                        htmlFor="selectPhotos" 
                                        className={dragActive?"photoContainerLabel drag-active":"photoContainerLabel"}
                                        onClick={()=>handleClick()} 
                                        onDragLeave={(e) => handleDrag(e)} 
                                        onDragEnter={(e) => handleDrag(e)} 
                                        onDragOver={(e) => handleDrag(e)} 
                                        onDrop={handleDrop} 
                                    >
                                    <i class='bx bx-upload' ></i>
                                    <span>Upload/Drop Photos Here</span>
                                </label>
                            </>}
                            {files.length > 0? <>
                                {files.map((item, index) => (
                                <div className="fileContainer" key={index+Date.now()}>
                                    <img src={item.imgPreview} />
                                    <i className='bx bxs-x-circle rmImage' onClick={(e) => handleRemoveImg(item.file)}></i>
                                </div>))}
                                <div className="fileContainer addPhotosLabel">
                                    <label htmlFor="selectPhotos" onClick={()=>handleClick()}>
                                        <i class='bx bxs-plus-circle' ></i>
                                        <span>Add More Photos</span>
                                    </label>
                                </div>
                                </>:<></>
                            }
                            <input type="file" name="selectPhotos" accept="images/*" ref={hiddenFileInput} multiple={true} onChange={(e) => handleSelectFiles(e)} />
                        </div>
                    </div>
                </div>
                <div className={activeTabs.mainTab == 3?"listCarSettings":"listCarSettings no-show"}>
                    <div className={activeTabs.mainTab == 3?"listCarSettingsHeader":"listCarSettingsHeader no-show"}>
                        <span className={activeTabs.mainTab >= 3 && activeTabs.subTab >= 1?"specifications active":"specifications"}>
                            <i class='bx bxs-check-circle' ></i>
                            <h3>Specifications</h3>
                        </span>
                        <span className={activeTabs.mainTab >= 3 && activeTabs.subTab >= 2?"pickupaddress active":"pickupaddress"}>
                            <i class='bx bxs-check-circle' ></i>
                            <h3>Car Pickup address</h3>
                        </span>
                        <span className={activeTabs.mainTab >= 3 && activeTabs.subTab >= 3?"settings active":"settings"}>
                            <i class='bx bxs-check-circle' ></i>
                            <h3>Settings</h3>
                        </span>
                    </div>
                    <div className={activeTabs.mainTab == 3 && activeTabs.subTab == 1?"listCarSpecifications":"listCarSpecifications no-show"}>
                        <div className="listCarBasicTitle">
                            <h3>Specifications</h3>
                        </div>
                        <div className="listCarSpecificationsForm">
                            <div className="listCarSpecificationsFormItem">
                                <h3>Transmission</h3>
                                <span>Car transmission</span>
                                <div className="listCarSpecificationsItemInputs">
                                    <div className="specsItemInput">
                                        <select>
                                            <option>-Select type-</option>
                                            <option>Manual</option>
                                            <option>Semi-Automatic</option>
                                            <option>Automatic</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="listCarSpecificationsFormItem">
                                <h3>Fuel Type</h3>
                                <span>Petrol, diesel, gasoline</span>
                                <div className="listCarSpecificationsItemOptions">
                                    <div className="specsItemOption">
                                        <input type="checkbox" 
                                            checked={carSpecifications.fuelType === 'Diesel'?true:false} 
                                            onChange={(e)=> handleCarSpecifications('fuelType',e)}
                                            value="Diesel"
                                        />
                                        <h5>Diesel</h5>
                                    </div>
                                    <div className="specsItemOption">
                                        <input type="checkbox" 
                                            checked={carSpecifications.fuelType === 'Petrol'?true:false} 
                                            onChange={(e)=> handleCarSpecifications('fuelType',e)}
                                            value="Petrol"
                                        />
                                        <h5>Petrol</h5>
                                    </div>
                                    <div className="specsItemOption">
                                        <input type="checkbox" 
                                            checked={carSpecifications.fuelType === 'Electric'?true:false}
                                            onChange={(e) => handleCarSpecifications('fuelType',e)}
                                            value="Electric" 
                                        />
                                        <h5>Electric</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="listCarSpecificationsFormItem">
                                <h3>Doors</h3>
                                <span>Doors available</span>
                                <div className="listCarSpecificationsItemOptions">
                                    <div className="specsItemOption">
                                        <input type="checkbox" 
                                            checked={carSpecifications.doors == 4?true:false}
                                            onChange={(e) => handleCarSpecifications('doors', e)}
                                            value={4}
                                        />
                                        <h5>4</h5>
                                    </div>
                                    <div className="specsItemOption">
                                        <input type="checkbox" 
                                            checked={carSpecifications.doors == 5?true:false}
                                            onChange={(e) => handleCarSpecifications('doors', e)}
                                            value={5}
                                        />
                                        <h5>5</h5>
                                    </div>
                                    <div className="specsItemOption">
                                        <input type="checkbox" 
                                            checked={carSpecifications.doors == 6?true:false}
                                            onChange={(e) => handleCarSpecifications('doors', e)}
                                            value={6}
                                        />
                                        <h5>6</h5>
                                    </div>
                                    <div className="specsItemOption">
                                        <input type="checkbox" 
                                            checked={carSpecifications.doors == 7?true:false}
                                            onChange={(e) => handleCarSpecifications('doors', e)}
                                            value={7}
                                        />
                                        <h5>7</h5>
                                    </div>
                                    <div className="specsItemOption">
                                        <input type="checkbox" 
                                            checked={carSpecifications.doors == 8?true:false}
                                            onChange={(e) => handleCarSpecifications('doors', e)}
                                            value={8}
                                        />
                                        <h5>8</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="listCarSpecificationsFormItem">
                                <h3>Safety</h3>
                                <span>Does your car have safety amenities</span>
                                <div className="listCarSpecificationsItemOptions">
                                    <div className="specsItemOption">
                                        <input type="checkbox" 
                                            checked={carSpecifications.safetyAmenity === 'yes'?true:false} 
                                            onChange={(e)=> handleCarSpecifications('safetyAmenity',e)}
                                            value='yes'
                                        />
                                        <h5>Yes</h5>
                                    </div>
                                    <div className="specsItemOption">
                                        <input type="checkbox" 
                                            checked={carSpecifications.safetyAmenity === 'no'?true:false} 
                                            onChange={(e)=> handleCarSpecifications('safetyAmenity',e)}
                                            value='no'
                                        />
                                        <h5>No</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="listCarSpecificationsFormItem">
                                <h3>Entertainment</h3>
                                <span>Does your car have entertainment amenities</span>
                                <div className="listCarSpecificationsItemOptions">
                                    <div className="specsItemOption">
                                        <input type="checkbox" 
                                            checked={carSpecifications.entertainmentAmenity === 'yes'?true:false} 
                                            onChange={(e)=> handleCarSpecifications('entertainmentAmenity',e)}
                                            value='yes'
                                        />
                                        <h5>Yes</h5>
                                    </div>
                                    <div className="specsItemOption">
                                        <input type="checkbox" 
                                            checked={carSpecifications.entertainmentAmenity === 'no'?true:false} 
                                            onChange={(e)=> handleCarSpecifications('entertainmentAmenity',e)}
                                            value='no'
                                        />
                                        <h5>No</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="listCarSpecificationsFormItem">
                                <h3>Powerlock</h3>
                                <span>Does your car have powerlock system</span>
                                <div className="listCarSpecificationsItemOptions">
                                    <div className="specsItemOption">
                                        <input type="checkbox" 
                                            checked={carSpecifications.powerLock === 'yes'?true:false} 
                                            onChange={(e)=> handleCarSpecifications('powerLock',e)}
                                            value='yes'
                                        />
                                        <h5>Yes</h5>
                                    </div>
                                    <div className="specsItemOption">
                                        <input type="checkbox" 
                                            checked={carSpecifications.powerLock === 'no'?true:false} 
                                            onChange={(e)=> handleCarSpecifications('powerLock',e)}
                                            value='no'
                                        />
                                        <h5>No</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="listCarSpecificationsFormItem">
                                <h3>Seats</h3>
                                <span>Seating capacity</span>
                                <div className="listCarSpecificationsItemOptions">
                                    <div className="specsItemOption">
                                        <input type="checkbox" 
                                            checked={carSpecifications.seatingCapacity == 4?true:false} 
                                            onChange={(e)=> handleCarSpecifications('seatingCapacity',e)}
                                            value={4}
                                        />
                                        <h5>4</h5>
                                    </div>
                                    <div className="specsItemOption">
                                        <input type="checkbox" 
                                            checked={carSpecifications.seatingCapacity == 6?true:false} 
                                            onChange={(e)=> handleCarSpecifications('seatingCapacity',e)}
                                            value={6}
                                        />
                                        <h5>6</h5>
                                    </div>
                                    <div className="specsItemOption">
                                        <input type="checkbox" 
                                            checked={carSpecifications.seatingCapacity == 8?true:false} 
                                            onChange={(e)=> handleCarSpecifications('seatingCapacity',e)}
                                            value={8}
                                        />
                                        <h5>8</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="listCarSpecificationsFormItem">
                                <h3>Air Bags</h3>
                                <span>Does your car have air bags</span>
                                <div className="listCarSpecificationsItemOptions">
                                    <div className="specsItemOption">
                                        <input type="checkbox" 
                                            checked={carSpecifications.airBags === "yes"?true:false} 
                                            onChange={(e)=> handleCarSpecifications('airBags',e)}
                                            value="yes"
                                        />
                                        <h5>Yes</h5>
                                    </div>
                                    <div className="specsItemOption">
                                        <input type="checkbox" 
                                            checked={carSpecifications.airBags === "no"?true:false} 
                                            onChange={(e)=> handleCarSpecifications('airBags',e)}
                                            value="no"
                                        />
                                        <h5>No</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="listCarSpecificationsFormItem">
                                <h3>Mileage</h3>
                                <span>Mileage</span>
                                <div className="listCarSpecificationsItemInputs">
                                    <div className="specsItemInput">
                                        <input type="text" pattern="[0-9]*"/>
                                        <span>per Litre</span>
                                    </div>
                                </div>
                            </div>
                            <div className="listCarSpecificationsFormItem">
                                <h3>Fuel Capacity</h3>
                                <span>Fuel tank capacity</span>
                                <div className="listCarSpecificationsItemInputs">
                                    <div className="specsItemInput">
                                        <input type="text" pattern="[0-9]*"/>
                                        <span>Litres</span>
                                    </div>
                                </div>
                            </div>
                            <div className="listCarSpecificationsFormItem">
                                <h3>Child seats</h3>
                                <span>Does your car have child seats</span>
                                <div className="listCarSpecificationsItemOptions">
                                    <div className="specsItemOption">
                                        <input type="checkbox" 
                                            checked={carSpecifications.childSeats === "yes"?true:false} 
                                            onChange={(e)=> handleCarSpecifications('childSeats',e)}
                                            value="yes"
                                        />
                                        <h5>Yes</h5>
                                    </div>
                                    <div className="specsItemOption">
                                        <input type="checkbox" 
                                            checked={carSpecifications.childSeats === "no"?true:false} 
                                            onChange={(e)=> handleCarSpecifications('childSeats',e)}
                                            value="no"
                                        />
                                        <h5>No</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={activeTabs.mainTab == 3 && activeTabs.subTab == 2?"listCarPickUpAddress":"listCarPickUpAddress no-show"}>
                        <div className="listCarBasicTitle">
                            <h3>Car Pickup Address</h3>
                        </div>
                        <div className="listCarPickUpAddressForm">
                            <div className="basicInfoFormItem">
                                <label>City<sup>*</sup></label>
                                <input type="text" placeholder="Nairobi"/>
                            </div>
                            <div className="basicInfoFormItem">
                                <label>Street Address<sup>*</sup></label>
                                <input type="text" placeholder="Car yard, Upperhill"/>
                            </div>
                            <div className="basicInfoFormItem">
                                <label>Zip Code<sup>*</sup></label>
                                <input type="text" placeholder="0.00"/>
                            </div>
                        </div>
                        <div className="listCarPickUpAddressFormDesc">
                            <label>Description<sup>*</sup></label>
                            <textarea rows={5} placeholder="Describe how to get there in great details">
                            </textarea>
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