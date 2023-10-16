import Customer from "../models/Customer.js";
import bcrypt from 'bcryptjs'
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import Vendor from "../models/Vendor.js";

export const registerCustomer = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newCustomer = new Customer({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash,
            gender: req.body.gender,
            birthdate: req.body.birthdate,
            address: req.body.address,
            phonenumber: req.body.phonenumber,
            altphonenumber: req.body.altphonenumber,
            photo:req.body.photo,
        })

        await newCustomer.save()
        res.status(200).send("Account has been created.")
    } catch (err) {
        next(err)
    }
}

export const registerVendor = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newVendor = new Vendor({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash,
            gender: req.body.gender,
            birthdate: req.body.birthdate,
            address: req.body.address,
            phonenumber: req.body.phonenumber,
            altphonenumber: req.body.altphonenumber,
            photo:req.body.photo,
        })

        await newVendor.save()
        res.status(200).send("Vendor has been created.")
    } catch (err) {
        next(err)
    }
}

export const loginCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.findOne({email: req.body.email})
        if(!customer) return next(createError(404, "User not found!"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, customer.password)
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or username"))

        const token = jwt.sign({ id: customer._id, isAdmin: false }, process.env.JWT_TOKEN)

        const { password, ...otherDetails } = customer._doc

        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json({ ...otherDetails })
    } catch (err) {
        next(err)
    }
}