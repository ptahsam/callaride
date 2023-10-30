import express from "express";
import { 
    createListing, 
    deleteListing, 
    getListing, 
    getListings, 
    getPaginatedListings, 
    getRecommendedListings, 
    updateListing, 
    updateListingNewField,
    updateListingViewCount
} from "../controllers/listings.js";

const router = express.Router();

//CREATE
router.post("/", /*verifyUser,*/ createListing);

//UPDATE NEW FIELD
router.put("/update", /*verifyUser,*/ updateListingNewField);

//UPDATE VIEW COUNT
router.put("/update/viewcount/:id", updateListingViewCount)

//UPDATE
router.put("/update/:id", updateListing)

//DELETE
router.delete("/:id", /*verifyUser,*/ deleteListing);

//GET
router.get("/find/:id", getListing);

//GET ALL
router.get("/", getListings);

//GET PAGINATED
router.get("/paginated", getPaginatedListings)

//GET RECOMMENDED LISTINGS
router.get("/recommended", getRecommendedListings)

export default router;