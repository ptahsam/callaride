import useFetch from "../../../hooks/useFetch"
import { createRatingStars } from "../../utils/helper"
import "./reviewCard.css"

const ReviewCard = ({ review }) => {
  const { data, loading, error } = useFetch(`/customers/find/${review.userId}`)  

  return (
    <div className="reviewCard">
        <div className="reviewCardContainer">
            <div className="reviewCardImg">
                <img src={data?.photo !== ""?data?.photo:"../../images/profile/profile.jpg"} />
            </div>
            <div className="reviewCardDetails">
                <span className="name">{`${data?.firstname} ${data?.lastname}`}</span>
                <span className="rating">
                    <span className="ratingStars">
                    {createRatingStars(review.rating).map((rating, index) => (
                        <i className={rating} key={index}></i>
                    ))}
                    </span>
                    <div className="ratingCount">{`(${review.rating}.0)`}</div>
                </span>
            </div>
        </div>
        <div className="desc">
            <p>{review.desc}</p>
        </div>
    </div>
  )
}

export default ReviewCard