import mongoose from "mongoose";
const BrandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
            required: true,
        },
        models: [
            {
                model_name: {
                    type: String,
                }
            }
        ],
    },
    { timestamps: true }
);
export default mongoose.model("Brand", BrandSchema);