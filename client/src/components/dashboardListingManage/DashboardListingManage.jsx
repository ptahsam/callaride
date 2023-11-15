import { useEffect, useState } from "react";
import "./dashboardListingManage.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashboardListingManage = ({ activeItem, setActiveItem, listingid }) => {

  const navigate = useNavigate()
  const [listing, setListing] = useState()
  const [activeItemMenu, setActiveItemMenu] = useState(1)
  const [carBrand, setCarBrand] = useState()
  const [carModel, setCarModel] = useState([])

  useEffect(() => {
    const fetchListing = async () => {
      const listingData =  await axios.get(`/listings/find/${activeItem.listingid}`)
      setListing(listingData.data)
      fetchCarBrand(listingData.data)
    }

    fetchListing()
  },[listingid])

  const fetchCarBrand = async (data) => {
    const allRes =  await axios.get(`/brand/find/${data?.carBasicInfo?.carBrand}`)
    fetchCarModel(data, allRes.data)
    setCarBrand(allRes.data)
  }

  const fetchCarModel = async (data, brand) => {
    const brandModel = brand?.models?.filter((model) => model._id === data?.carBasicInfo?.carModel)
    setCarModel(brandModel)
  }

  const handleNavigate = (item) => {
    setActiveItem(item)
  };

  console.log(carModel)

  return (
    <div className={activeItem.mainTab == 3 && activeItem.subTab == 2?'dashboardListingManage':'dashboardListingManage no-show'}>
        <div className="dashboardListingManageHeader">
            <span className="listingHeaderBack" onClick={() => handleNavigate({ mainTab : 3, subTab: 1 })}>
                <i class='bx bx-chevron-left'></i>
                Back to Listings
            </span>
            <div className="listingManageHeaderTitle">
              <span className="title">{listing?.carBasicInfo?.carName}</span>
            </div>
            <div className="listingManageHeaderOptions">
              <select value={listing?.status} className={listing?.status === 'active'?'active':'inactive'}>
                <option value='active' className="active">Active</option>
                <option value='inactive' className="inactive">In Active</option>
              </select>
              <span className={listing?.approvalStatus === 'submitted_for_review'?
              "optionItem inreview":listing?.approvalStatus === 'approved'?
              "optionItem approved":"optionItem rejected"}>{
                listing?.approvalStatus === 'submitted_for_review'?'In Review':
                listing?.approvalStatus === 'approved'?'Available':
                'Rejected'
              }</span>
              <div className="sepV"></div>
              <span className="optionItem view" onClick={() => navigate(`/listings/${listing?._id}`)}>View on website</span>
            </div>
        </div>
        <div className="dashboardListingManageBody">
          <div className="dashbaordListingManageBodyHeader">
            <span 
              className={activeItemMenu == 1?"dashbaordListingManageBodyHeaderItem active":"dashbaordListingManageBodyHeaderItem"}
              onClick={() => setActiveItemMenu(1)}
            >
              Listing Content
            </span>
            <span 
              className={activeItemMenu == 2?"dashbaordListingManageBodyHeaderItem active":"dashbaordListingManageBodyHeaderItem"}
              onClick={() => setActiveItemMenu(2)}
            >
              Schedule & Pricing
            </span>
            <span 
              className={activeItemMenu == 3?"dashbaordListingManageBodyHeaderItem active":"dashbaordListingManageBodyHeaderItem"}
              onClick={() => setActiveItemMenu(3)}
            >
              Accelerating
            </span>
          </div>
          <div className={activeItemMenu == 1?"manageListingContent":"manageListingContent no-show"}>
            <div className="listingContentItem">
              <div className="listingContentItemDetails hasBorder photos">
                <div className="listingContentItemHeader">
                  <span className="title">Photos</span>
                  <span className="editBtn">Edit</span>
                </div>
                <div className="listingContentItemBody">
                  {listing?.carPhotos?.slice(0, 6).map((photo, index) => (
                    <div className="cardPhoto" key={index}>
                      <img src={photo} />
                      
                    </div>
                  ))}
                  <span className="countExtra">{listing?.carPhotos?.length > 6?`${listing.carPhotos.length - 6} +`:''}</span>
                </div>
              </div>
              <div className="listingContentItemDetails hasBorder basicDetails">
                <div className="listingContentItemHeader">
                  <span className="title">Basic Details</span>
                  <span className="editBtn">Edit</span>
                </div>
                <div className="listingContentItemBody">
                  <div className="basicInfoDetails">
                    <span>City</span>
                    <span>Brand</span>
                    <span>Model</span>
                    <span>Year</span>
                    <span>Type</span>
                    <span>Reg No</span>
                  </div>
                  <div className="basicInfoDetailsValues">
                    <span>{listing?.carBasicInfo?.city}</span>
                    <span>{carBrand?.name}</span>
                    <span>{carModel[0]?.model_name}</span>
                    <span>{listing?.carBasicInfo?.year}</span>
                    <span>{listing?.carBasicInfo?.carType}</span>
                    <span>{listing?.carBasicInfo?.regNo}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="listingContentItemInfo">

            </div>
          </div>
        </div>
    </div>
  )
}

export default DashboardListingManage