import express from "express"
import { registerCustomer } from "../controllers/auth.js";

const router = express.Router();

router.post("/registerCustomer", registerCustomer)

export default router