import mongoose from "mongoose";
const BookingSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true,
        },
        listing_owner_id: {
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
        payment: {
            security_deposit: {
               amount: {
                   type: Number,
               },
               status: {
                   type: String,
               }, 
            },
            service_fee: {
                amount: {
                   type: Number,
                },
                status: {
                   type: String,
                }, 
            },
            charge: {
                amount: {
                   type: Number,
                },
                status: {
                   type: String,
                }, 
            },
        },
        status: {
            type: String,
            required: true,
        },
        approval_status: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
export default mongoose.model("Booking", BookingSchema);