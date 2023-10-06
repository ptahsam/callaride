import express from "express";
import { 
    createListing, 
    deleteListing, 
    getListing, 
    getListings, 
    updateListing 
} from "../controllers/listings.js";

const router = express.Router();

//CREATE
router.post("/", /*verifyUser,*/ createListing);

//UPDATE
router.put("/:id", /*verifyUser,*/ updateListing);

//DELETE
router.delete("/:id", /*verifyUser,*/ deleteListing);

//GET
router.get("/find/:id", getListing);

//GET ALL
router.get("/", getListings);

export default router;