import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import customerRoute from "./routes/customer.js"
import vendorRoute from "./routes/vendor.js"
import listingRoute from "./routes/listing.js"
import bookingRoute from "./routes/booking.js"
import brandRoute from "./routes/brand.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log("Connected to mongoDB.");
    } catch (error){
        throw error;
    }
};

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/customers", customerRoute);
app.use("/api/vendors", vendorRoute);
app.use("/api/brand", brandRoute);
app.use("/api/listings", listingRoute);
app.use("/api/bookings", bookingRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

app.listen(8800, () => {
    connect()
    console.log("Connected to backend.")
});