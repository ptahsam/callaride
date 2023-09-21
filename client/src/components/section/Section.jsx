import "./section.css"

const Section = () => {
  return (
    <div className="section">
        <div className="sectionContainer">
            <div className="sectionImage">
                <img src="../../images/section/section2.jpg"/>
            </div>
            <div className="sectionDesc">
                <div className="sectionDescTitle">
                    <h3>Make awesome travel easy and affordable</h3>
                </div>
                <div className="sectionDescIntro">
                    <p>
                        Whether you're planning a weekend getaway, a business trip, or an epic cross-country journey, 
                        our user-friendly platform is your gateway to an extensive fleet of vehicles, offering comfort, 
                        style, and reliability at your fingertips. With a seamless booking process, competitive rates, 
                        and a commitment to exceptional customer service, we're here to ensure that your travel experiences 
                        are not just convenient but unforgettable. Explore our diverse range of cars, from compact to luxury, 
                        and embark on your next adventure with confidence.
                    </p>
                </div>
                <div className="sectionDescBtn">
                    <span>Discover</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Section