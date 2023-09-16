import Customer from "../models/Customer.js";
import bcrypt from 'bcryptjs'
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
        res.status(200).send("Customer has been created.")
    } catch (err) {
        next(err)
    }
}