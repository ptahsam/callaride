import Review from "../models/Review.js";


export const createReview = async (req, res, next) => {
    const newReview = new Review(req.body)

    try {
        const savedReview = await newReview.save();
        res.status(200).json("Review added successfully")
    } catch (err) {
        next(err)
    }
}

export const updateReview = async (req, res, next) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, { $set: req.body }, {new:true});
        res.status(200).json(updatedReview)
    } catch (err) {
        next(err)
    }
}

export const removeReviewModel = async (req, res, next) => {
    try {
        await Review.findByIdAndUpdate(req.params.id, {
            $pull: { models: req.body.model },
        })
        res.status(200).json("Review model has been deleted.")
    } catch (err) {
        next(err)
    }
}

export const deleteReview = async (req, res, next) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.status(200).json("Review has been deleted")
    } catch (err) {
        next(err)
    }
}

export const getReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id);
        res.status(200).json(review)
    } catch (err) {
        next(err)
    }
}

export const getReviews = async (req, res, next) => {
    const {
        listing
    } = req.query

    try {
        const reviews = await Review.find({
            listingId: listing?listing : { $ne: listing }
        });
        res.status(200).json(reviews)
    } catch (err) {
        next(err)
    }
}