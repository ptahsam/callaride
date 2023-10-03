import "./footer.css"

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerContainer">
        <div className="footerDetails">
          <div className="footerCompanyDetails">
            <div className="footerLocalization">
              <select>
                <option>English</option>
                <option>Swahili</option>
              </select>
              <select>
                <option>USD</option>
                <option>KES</option>
              </select>
            </div>
            <div className="footerTitle">
              <div className="footerImg"></div>
              <h1>Rent Go</h1>
            </div>
            <div className="footerCompanyDesc">
              <span>We are here to help you travel</span>
            </div>
            <div className="footerCompanySocials">
              <span>
                <i class='bx bxl-facebook' ></i>
              </span>
              <span>
                <i class='bx bxl-twitter' ></i>
              </span>
              <span>
                <i class='bx bxl-google-plus' ></i>
              </span>
              <span>
                <i class='bx bxl-linkedin' ></i>
              </span>
            </div>
            <div className="footerCompanyApp">
              <a href="#">
                <img src="../../images/app/google-play.png" />
              </a>
              <a href="#">
                <img src="../../images/app/app-store.png" />
              </a>
            </div>
          </div>
          <div className="footerCompanyService">
            <div className="footerCompanyServiceHeader">
              <h3>Service</h3>
            </div>
            <div className="footerCompanyServiceBody">
              <div className="footerCompanyServiceItem">
                <span>
                  <i class='bx bx-chevrons-right' ></i>
                  Contact Us
                </span>
              </div>
              <div className="footerCompanyServiceItem">
                <span>
                  <i class='bx bx-chevrons-right' ></i>
                  FAQ
                </span>
              </div>
            </div>
          </div>
          <div className="footerCompanyPolicies">
            <div className="footerCompanyPoliciesHeader">
              <h3>Company</h3>
            </div>
            <div className="footerCompanyPoliciesBody">
              <div className="footerCompanyPoliciesItem">
                <span>
                  <i class='bx bx-chevrons-right' ></i>
                  Privacy Policy
                </span>
              </div>
              <div className="footerCompanyPoliciesItem">
                <span>
                  <i class='bx bx-chevrons-right' ></i>
                  Cancellation Policy
                </span>
              </div>
              <div className="footerCompanyPoliciesItem">
                <span>
                  <i class='bx bx-chevrons-right' ></i>
                  About Us
                </span>
              </div>
              <div className="footerCompanyPoliciesItem">
                <span>
                  <i class='bx bx-chevrons-right' ></i>
                  How it Works
                </span>
              </div>
              <div className="footerCompanyPoliciesItem">
                <span>
                  <i class='bx bx-chevrons-right' ></i>
                  Business Travel
                </span>
              </div>
              <div className="footerCompanyPoliciesItem">
                <span>
                  <i class='bx bx-chevrons-right' ></i>
                  Travel Credit
                </span>
              </div>
            </div>
          </div>
          <div className="footerCompanyContacts">
            <div className="footerCompanyContactsHeader">
              <h3>Get in Touch</h3>
            </div>
            <div className="footerCompanyContactsBody">
              <div className="footerCompanyContactsItem">
                <i class='bx bxs-map' ></i>
                <div className="footerCompanyContactsItemDetails">
                  <h4>Our Address</h4>
                  <span>Upperhill, Nairobi, Kenya</span>
                </div>
              </div>
              <div className="footerCompanyContactsItem">
                <i class='bx bxs-phone' ></i>
                <div className="footerCompanyContactsItemDetails">
                  <h4>Phone Number</h4>
                  <span>+25472777788</span>
                </div>
              </div>
              <div className="footerCompanyContactsItem">
                <i class='bx bxs-envelope' ></i>
                <div className="footerCompanyContactsItemDetails">
                  <h4>Email</h4>
                  <span>info@callaride.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footerBottom">
          <span>© Copyright 2022. RentGo. All Rights Reserved</span>
        </div>
      </div>
    </div>
  )
}

export default Footer