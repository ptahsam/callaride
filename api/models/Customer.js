import mongoose from "mongoose";
const CustomerSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        gender: {
            type: String,
            required: true,
        },
        birthdate: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phonenumber: {
            type: Number,
            required: true,
        },
        altphonenumber: {
            type: Number,
        },
        language: {
            type: String,
        },
        photo: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Customer", CustomerSchema);