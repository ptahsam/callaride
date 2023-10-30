import express from "express"
import { 
    updateCustomer,
    deleteCustomer,
    getCustomer,
    getCustomers
} from "../controllers/customers.js";
import { 
    verifyAdmin, 
    verifyUser
 } from "../utils/verifyToken.js";

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
router.put("/:id", /*verifyUser,*/ updateCustomer);

//DELETE
router.delete("/:id", /*verifyUser,*/ deleteCustomer);

//GET
router.get("/find/:id", /*verifyUser,*/ getCustomer);

//GET ALL
router.get("/", /*verifyAdmin,*/ getCustomers);

export default router;