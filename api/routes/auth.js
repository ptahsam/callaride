import express from "express"
import { registerCustomer, registerVendor } from "../controllers/auth.js";

const router = express.Router();

//REGISTER NEW CUSTOMER ROUTE
router.post("/registerCustomer", registerCustomer);

//REGISTER NEW VENDOR ROUTE
router.post("/registerVendor", registerVendor);

export default router