import Booking from "../models/Booking.js";


export const createBooking = async (req, res, next) => {
    const newBooking = new Booking(req.body)

    try {
        const savedBooking = await newBooking.save();
        res.status(200).json(savedBooking)
    } catch (err) {
        next(err)
    }
}

export const updateBooking = async (req, res, next) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, { $set: req.body }, {new:true});
        res.status(200).json(updatedBooking)
    } catch (err) {
        next(err)
    }
}

export const deleteBooking = async (req, res, next) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json("Booking has been deleted")
    } catch (err) {
        next(err)
    }
}

export const getBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);
        res.status(200).json(booking)
    } catch (err) {
        next(err)
    }
}

export const getBookings = async (req, res, next) => {
    const { 
        userid,
        owner, 
        listingid,
        approvalstatus,
        ...others
    } = req.query
    try {
        const bookings = await Booking.find({
            ...others,
            listing_id: listingid?listingid: { $ne: listingid },
        });
    
        res.status(200).json(bookings)
    } catch (err) {
        next(err)
    }
}

export const getPaginatedBookings = async (req, res, next) => {
    const { 
        page,limit,
        userid,
        owner, 
        listingid,
        approvalstatus,
        start,end,
        ...others
    } = req.query
    try {
        const bookings = await Booking.aggregate([
            {
                $match: {
                    ...others,
                    "createdAt": { "$gte": new Date(start), "$lt": new Date(end)},
                    user_id: userid?userid: { $ne: userid },
                    listing_owner_id: owner?owner: { $ne: owner },
                    listing_id: listingid?listingid: { $ne: listingid },
                    approval_status: approvalstatus?approvalstatus: { $ne: approvalstatus }
                }
            }
        ]);

        const results = {}
        const pageNo = parseInt(page)
        const limitNo = parseInt(limit)
        const startIndex = (pageNo - 1) * limitNo;
        const lastIndex = (pageNo) * limitNo;
            
        results.totalResult = bookings.length;
        results.pageCount = Math.ceil(bookings.length/limitNo);

        if (lastIndex < bookings.length) {
            results.next = {
                page: pageNo + 1,
            }
        }
        
        if (startIndex > 0) {
            results.prev = {
                page: pageNo - 1,
            }
        }

        results.result = bookings.slice(startIndex, lastIndex);

        res.status(200).json(results)
    } catch (err) {
        next(err)
    }
}