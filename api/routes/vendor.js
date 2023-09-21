import express from "express"
import { 
    verifyAdmin, 
    verifyUser
 } from "../utils/verifyToken.js";
import { 
    deleteVendor, 
    getVendor, 
    getVendors, 
    updateVendor 
} from "../controllers/vendor.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("hello user, you are logged in and you can modify account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("hello admin, you are logged in and you can modify all accounts")
// })

//UPDATE
router.put("/:id", /*verifyUser,*/ updateVendor);

//DELETE
router.delete("/:id", /*verifyUser,*/ deleteVendor);

//GET
router.get("/:id", /*verifyUser,*/ getVendor);

//GET ALL
router.get("/", /*verifyAdmin,*/ getVendors);

export default router;