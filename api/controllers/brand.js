import Brand from "../models/Brand";

export const createBrand = async (req, res, next) => {
    const newBrand = new Brand(req.body)

    try {
        const savedBrand = await newBrand.save();
        res.status(200).json(savedBrand)
    } catch (err) {
        next(err)
    }
}

export const updateBrand = async (req, res, next) => {
    try {
        const updatedBrand = await Brand.findByIdAndUpdate(req.params.id, { $set: req.body }, {new:true});
        res.status(200).json(updatedBrand)
    } catch (err) {
        next(err)
    }
}

export const updateBrandModels = async (req, res, next) => {
    try {
        await Brand.findByIdAndUpdate(req.params.id, {
            $push: { models: req.body.model },
        })
        res.status(200).json("Brand model has been updated.")
    } catch (err) {
        next(err)
    }
}

export const removeBrandModel = async (req, res, next) => {
    try {
        await Brand.findByIdAndUpdate(req.params.id, {
            $pull: { models: req.body.model },
        })
        res.status(200).json("Brand model has been deleted.")
    } catch (err) {
        next(err)
    }
}

export const deleteBrand = async (req, res, next) => {
    try {
        await Brand.findByIdAndDelete(req.params.id);
        res.status(200).json("Brand has been deleted")
    } catch (err) {
        next(err)
    }
}

export const getBrand = async (req, res, next) => {
    try {
        const brand = await Brand.findById(req.params.id);
        res.status(200).json(brand)
    } catch (err) {
        next(err)
    }
}

export const getBrands = async (req, res, next) => {
    try {
        const brands = await Brand.find();
        res.status(200).json(brands)
    } catch (err) {
        next(err)
    }
}