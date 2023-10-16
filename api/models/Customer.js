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
        },
        birthdate: {
            type: Date,
            required: true,
        },
        address: {
            type: String,
        },
        phonenumber: {
            type: Number,
            required: true,
        },
        altphonenumber: {
            type: Number,
        },
        password: {
            type: String,
            required: true,
        },
        language: {
            type: String,
        },
        photo: {
            type: String,
        },
        driving_details: {
            insurance_no: {
                type: String,
            },
            license_no: {
                type: String,
            },
            age: {
                type: Number,
            },
        },
        listing_requirements: {
            id_copy: {
                type: String,
            },
            kra_pin: {
                type: String,
            },
            c_o_reg: {
                type: String,
            },
        },
    },
    { timestamps: true }
);

export default mongoose.model("Customer", CustomerSchema);