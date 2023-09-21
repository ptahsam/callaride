import Vendor from "../models/Vendor.js";

export const updateVendor = async (req, res, next) => {
    try {
        const updatedVendor = await Vendor.findByIdAndUpdate(req.params.id, { $set: req.body }, {new:true});
        res.status(200).json(updatedVendor)
    } catch (err) {
        next(err)
    }
}

export const deleteVendor = async (req, res, next) => {
    try {
        await Vendor.findByIdAndDelete(req.params.id);
        res.status(200).json("Vendor has been deleted")
    } catch (err) {
        next(err)
    }
}

export const getVendor = async (req, res, next) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        res.status(200).json(vendor)
    } catch (err) {
        next(err)
    }
}

export const getVendors = async (req, res, next) => {
    try {
        const vendors = await Vendor.find();
        res.status(200).json(vendors)
    } catch (err) {
        next(err)
    }
}