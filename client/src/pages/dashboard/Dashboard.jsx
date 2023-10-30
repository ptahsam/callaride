import { useContext, useEffect, useState } from "react"
import Footer from "../../components/footer/Footer"
import Navbar from "../../components/navbar/Navbar"
import "./dashboard.css"
import { useLocation, useNavigate } from "react-router-dom"
import DashboardListing from "../../components/dashboardListing/DashboardListing"
import DashboardProfile from "../../components/dashboardProfile/DashboardAccount"
import DashboardBooking from "../../components/dashboardBooking/DashboardBooking"
import { AuthContext } from "../../contexts/AuthContext"

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const  { user } = useContext(AuthContext)
  const [activeItem, setActiveItem] = useState(location.state?.item || { mainTab : 1, subTab: 1 });

  const handleTabs = (main, sub) => {
    setActiveItem((prev) => ({...prev, ['mainTab']: main, ['subTab']: sub}))
  }

  useEffect(() => {
    if(!user){
      navigate("/")
    }
  }, [user]);

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboardContainer">
        <div className="dashboardContainerCard">
          <div className="dashboardHeader">
            <span 
              className={activeItem.mainTab == 1?"dashboardHeaderItem active":"dashboardHeaderItem"}
              onClick={(e) => handleTabs(1, 1)}
            >
              Account
            </span>
            <span 
              className={activeItem.mainTab == 2?"dashboardHeaderItem active":"dashboardHeaderItem"}
              onClick={(e) =>  handleTabs(2, 1)}
            >
              Bookings
            </span>
            <span 
              className={activeItem.mainTab == 3?"dashboardHeaderItem active":"dashboardHeaderItem"}
              onClick={(e) =>  handleTabs(3, 1)}
            >
              Listings
            </span>
            <span 
              className={activeItem.mainTab == 4?"dashboardHeaderItem active":"dashboardHeaderItem"}
              onClick={(e) =>  handleTabs(4, 1)}
            >
              Payments
            </span>
            <span 
              className={activeItem.mainTab == 5?"dashboardHeaderItem active":"dashboardHeaderItem"}
              onClick={(e) =>  handleTabs(5, 1)}
            >
              Notifications
            </span>
            <span 
              className={activeItem.mainTab == 6?"dashboardHeaderItem active":"dashboardHeaderItem"}
              onClick={(e) =>  handleTabs(6, 1)}
            >
              Settings
            </span>
          </div>
          <div className="dashboardBody">
            <DashboardProfile activeItem={activeItem} />
            <DashboardBooking activeItem={activeItem} />
            <DashboardListing activeItem={activeItem} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard