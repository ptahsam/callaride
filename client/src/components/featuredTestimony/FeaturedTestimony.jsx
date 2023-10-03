import "./featuredTestimony.css"

const FeaturedTestimony = () => {
  return (
    <div className="featuredTestimony" 
        style={{  
            backgroundImage: "url(" + "/images/header/testimony.jpeg" + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}>
        <div className="featuredTestimonyContainer">
            <div className="featuredTestimonyDetails">
                <div className="featuredTestimonyHeader">
                    <span>A Car for every Need</span>
                    <h1>Our Customer Says</h1>
                </div>
                <div className="featuredTestimonyCustomerDetails">
                    <div className="featuredTestimonyCustomerImage">
                        <img src="../../images/profile/profile.jpg" />
                    </div>
                    <div className="featuredTestimonyCustomerName">
                        <h3>Lana Roadse</h3>
                        <span>Ceo of Motor Ways</span>
                    </div>
                    <div className="featuredTestimonyCustomerDesc">
                        <p>
                            Overall, my experience with Rent Go was top-notch. 
                            Their customer service, quality vehicles, and transparent pricing made for a fantastic car rental experience. 
                            I will definitely be using them again for my future car rental needs and highly recommend them to anyone 
                            in need of a reliable and trustworthy car rental company. 
                            Thank you for making my trip so enjoyable!
                        </p>
                    </div>
                </div>
                <div className="featuredTestimonyItemsNavs">
                    <span className="NavItem">
                        <i class='bx bx-chevron-left'></i>
                    </span>
                    <span className="NavItem">
                        <i class='bx bx-chevron-right'></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FeaturedTestimony