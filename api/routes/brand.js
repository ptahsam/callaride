import express from "express";
import { verifyUser } from "../utils/verifyToken.js";
import { 
    createBrand, 
    deleteBrand, 
    getBrand,  
    getBrands, 
    removeBrandModel, 
    updateBrand, 
    updateBrandModels
} from "../controllers/brand.js";

const router = express.Router();

//CREATE
router.post("/", /*verifyUser,*/ createBrand);

//UPDATE
router.put("/:id", /*verifyUser,*/ updateBrand);
router.put("/updateModel/:id", /*verifyUser,*/ updateBrandModels);
router.put("/removeModel/:id", /*verifyUser,*/ removeBrandModel);

//DELETE
router.delete("/:id", /*verifyUser,*/ deleteBrand);

//GET
router.get("/find/:id", getBrand);

//GET ALL
router.get("/", getBrands);

export default router;