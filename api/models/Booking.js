import mongoose from "mongoose";
const BookingSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true,
        },
        listing_id: {
            type: String,
            required: true,
        },
        dates: {
            type: [Date],
            required: true,
        },
        start_date: {
            type: String,
            required: true,
        },
        end_date: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);
export default mongoose.model("Booking", BookingSchema);