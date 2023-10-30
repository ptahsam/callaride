import Listing from "../models/Listing.js";

export const createListing = async (req, res, next) => {
    const newListing = new Listing(req.body)

    try {
        const savedListing = await newListing.save();
        res.status(200).json(savedListing)
    } catch (err) {
        next(err)
    }
}

export const updateListing = async (req, res, next) => {
    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, { $set: req.body }, {new:true});
        res.status(200).json(updatedListing)
    } catch (err) {
        next(err)
    }
}

export const updateListingNewField = async (req, res, next) => {
    try {
        await Listing.updateMany({}, { $set: req.body })
        res.status(200).json('New filed has been added')
    } catch (err) {
        next(err)
    }
}

export const updateListingViewCount = async (req, res, next) => {
    try {
        await Listing.findByIdAndUpdate(req.params.id, { $inc: { viewCount: 1 } })
        res.status(200).json('View count has been updated')
    } catch (err) {
        next(err)
    }
}

export const deleteListing = async (req, res, next) => {
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json("Listing has been deleted")
    } catch (err) {
        next(err)
    }
}

export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        res.status(200).json(listing)
    } catch (err) {
        next(err)
    }
}

export const getListings = async (req, res, next) => {
    const { 
        owner,approval,
        city, type, 
        brand, model, 
        hourlyMin, hourlyMax, 
        dailyMin, dailyMax,
        weeklyMin, weeklyMax,
        monthlyMin, monthlyMax, 
        ...others
    } = req.query
    try {
        const listings = await Listing.find({
            ...others,
            listingOwner: owner?owner: { $ne: owner },
            approvalStatus: approval?approval: { $ne: approval },
            "carBasicInfo.city": city?city: { $ne: city },
            "carBasicInfo.carType": type?type: { $ne: type },
            "carBasicInfo.carBrand": brand?brand: { $ne: brand },
            "carBasicInfo.carModel": model?model: { $ne: model },
            "carPricing.hourly_booking.price_per_hour": hourlyMin? { $gt: hourlyMin, $lt: hourlyMax } : {$gte: 0},
            "carPricing.daily_booking.price_per_day": dailyMin? { $gt: dailyMin, $lt: dailyMax } : {$gte: 0},
            "carPricing.weekly_booking.price_per_week": weeklyMin? { $gt: weeklyMin, $lt: weeklyMax } : {$gte: 0},
            "carPricing.monthly_booking.price_per_month": monthlyMin? { $gt: monthlyMin, $lt: monthlyMax } : {$gte: 0},
        });

        res.status(200).json(listings)
    } catch (err) {
        next(err)
    }
}

export const getPaginatedListings = async (req, res, next) => {
    const { 
        page,limit,
        owner,approval,
        city, type, 
        brand, model, 
        hourlyMin, hourlyMax, 
        dailyMin, dailyMax,
        weeklyMin, weeklyMax,
        monthlyMin, monthlyMax, 
        ...others
    } = req.query
    try {
        const listings = await Listing.find({
            ...others,
            listingOwner: owner?owner: { $ne: owner },
            approvalStatus: approval?approval: { $ne: approval },
            "carBasicInfo.city": city?city: { $ne: city },
            "carBasicInfo.carType": type?type: { $ne: type },
            "carBasicInfo.carBrand": brand?brand: { $ne: brand },
            "carBasicInfo.carModel": model?model: { $ne: model },
            "carPricing.hourly_booking.price_per_hour": hourlyMin? { $gt: hourlyMin, $lt: hourlyMax } : {$gte: 0},
            "carPricing.daily_booking.price_per_day": dailyMin? { $gt: dailyMin, $lt: dailyMax } : {$gte: 0},
            "carPricing.weekly_booking.price_per_week": weeklyMin? { $gt: weeklyMin, $lt: weeklyMax } : {$gte: 0},
            "carPricing.monthly_booking.price_per_month": monthlyMin? { $gt: monthlyMin, $lt: monthlyMax } : {$gte: 0},
        });

        const results = {}
        const pageNo = parseInt(page)
        const limitNo = parseInt(limit)
        const startIndex = (pageNo - 1) * limitNo;
        const lastIndex = (pageNo) * limitNo;
            
        results.totalResult = listings.length;
        results.pageCount = Math.ceil(listings.length/limitNo);

        if (lastIndex < listings.length) {
            results.next = {
                page: pageNo + 1,
            }
        }
        
        if (startIndex > 0) {
            results.prev = {
                page: pageNo - 1,
            }
        }

        results.result = listings.slice(startIndex, lastIndex);

        res.status(200).json(results)
    } catch (err) {
        next(err)
    }
}

export const getRecommendedListings = async (req, res, next) => {
    const {
        limit
    } = req.query

    try {
        const listings = await Listing.aggregate([
            {$sort : {viewCount : -1}}
        ]).limit(parseInt(limit));
        res.status(200).json(listings)
    } catch (err) {
        next(err)
    }
}