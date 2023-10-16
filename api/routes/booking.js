import express from "express";
import { 
    createBooking, 
    deleteBooking, 
    getBooking, 
    getBookings, 
    updateBooking 
} from "../controllers/bookings.js";

const router = express.Router();

//CREATE
router.post("/", /*verifyUser,*/ createBooking);

//UPDATE
router.put("/:id", /*verifyUser,*/ updateBooking);

//DELETE
router.delete("/:id", /*verifyUser,*/ deleteBooking);

//GET
router.get("/find/:id", getBooking);

//GET ALL
router.get("/", getBookings);

export default router;