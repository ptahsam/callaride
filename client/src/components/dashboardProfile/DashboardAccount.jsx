import { useContext, useRef, useState } from "react"
import "./dashboardAccount.css"
import { AuthContext } from "../../contexts/AuthContext"
import { format } from "date-fns"
import PhotoModalCard from "../cards/photoModalCard/PhotoModalCard"
import { fileToDataURL } from "../utils/helper"

const DashboardAccount = ({ activeItem }) => {
  const  { user } = useContext(AuthContext)
  const [activeMenu, setActiveMenu] = useState(1)
  const [openPhotoModalCard, setOpenPhotoModalCard] = useState(false)
  const [uploadedPhotoFile, setUploadedPhotoFile] = useState(null)

  const hiddenFileInput = useRef(null);

  const handleResetPhotoUpload = () => {
    hiddenFileInput.current.value = ""
  }

  const handleClickPhotoUpload = () => {
    hiddenFileInput.current.click();
  }

  const handleSelectPhotoFile = async (e) => {
    const  photoFile = await fileToDataURL(e.target.files[0])
    if(photoFile){
      setUploadedPhotoFile(photoFile)
      setOpenPhotoModalCard(true)
    }
  }

  return (
    <div className={activeItem.mainTab == 1 && activeItem.subTab == 1?"dashboardAccount":"dashboardAccount no-show"}>
        <div className="dashboardAccountHeader">
            <h3>Account</h3>
        </div>
        <div className="dashboardAccountMenu">
          <span 
            className={activeMenu == 1?"dashboardAccountItem active":"dashboardAccountItem"}
            onClick={() => setActiveMenu(1)}
          >Account Details</span>
          <span 
            className={activeMenu == 2?"dashboardAccountItem active":"dashboardAccountItem"}
            onClick={() => setActiveMenu(2)}
          >License & Insurance</span>
        </div>
        <div className="dashboardAccountBody">
          <div className={activeMenu == 1?"accountDetails":"accountDetails no-show"}>
            <div className="accountDetailsEdit">
              <span className="editBtn">Edit</span>
            </div>
            <div className="accountDetailsPhoto">
              <div className="photo">
                <img src={user.photo !== ""?user.photo:"../../images/profile/profile.jpg"} />
                <span 
                  onClick={()=>handleClickPhotoUpload()}
                >
                  <i class='bx bx-camera'></i>
                  <input 
                    type="file" 
                    accept="images/*" 
                    name="profilephoto" 
                    id="profilephoto" 
                    ref={hiddenFileInput}
                    multiple={false}
                    onChange={(e) => handleSelectPhotoFile(e)}
                  />
                </span>
              </div>
            </div>
            <div className="accountDetailsInfo">
              <div className="accountDetailsInfoItem">
                <label>Firstname</label>
                <span>{user.firstname}</span>
              </div>
              <div className="accountDetailsInfoItem">
                <label>Lastname</label>
                <span>{user.lastname}</span>
              </div>
              <div className="accountDetailsInfoItem">
                <label>Email</label>
                <span>{user.email}</span>
              </div>
              <div className="accountDetailsInfoItem">
                <label>Lastname</label>
                <span>{user.gender}</span>
              </div>
              <div className="accountDetailsInfoItem">
                <label>Phonenumber</label>
                <span>{user.phonenumber}</span>
              </div>
              <div className="accountDetailsInfoItem">
                <label>Alt Number</label>
                <span>{user.altphonenumber}</span>
              </div>
              <div className="accountDetailsInfoItem">
                <label>Address</label>
                <span>{user.address}</span>
              </div>
              <div className="accountDetailsInfoItem">
                <label>Birth Date</label>
                <span>{format(new Date(`${user.birthdate}`), 'yyyy-MM-dd')}</span>
              </div>
            </div>
          </div>
        </div>
        {openPhotoModalCard && 
        <PhotoModalCard 
          setOpenPhotoModalCard={setOpenPhotoModalCard} 
          photoFile={uploadedPhotoFile} 
          handleResetPhotoUpload={handleResetPhotoUpload}
        />}
    </div>
  )
}

export default DashboardAccount