import express from "express";
import { verifyUser } from "../utils/verifyToken.js";
import { 
    createReview, 
    deleteReview, 
    getReview, 
    getReviews, 
    updateReview
} from "../controllers/review.js";


const router = express.Router();

//CREATE
router.post("/", /*verifyUser,*/ createReview);

//UPDATE
router.put("/:id", /*verifyUser,*/ updateReview);

//DELETE
router.delete("/:id", /*verifyUser,*/ deleteReview);

//GET
router.get("/find/:id", getReview);

//GET ALL
router.get("/", getReviews);

export default router;