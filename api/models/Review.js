import mongoose from "mongoose";
const ReviewSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        listingId: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        desc: {
            type: String
        }
    },
    { timestamps: true }
);
export default mongoose.model("Review", ReviewSchema);