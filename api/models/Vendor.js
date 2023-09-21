import mongoose from "mongoose";
const VendorSchema = new mongoose.Schema(
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
        listing_requirements: [
            {
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
        ],
    },
    { timestamps: true }
);

export default mongoose.model("Vendor", VendorSchema);