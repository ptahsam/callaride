import mongoose from "mongoose";
const ListingSchema = new mongoose.Schema(
    {
        listingOwner: {
            type: String,
            required: true
        },
        viewCount: {
            type: Number,
        },
        carBasicInfo: {
            city: {
                type: String,
                required: true,
            },
            carBrand: {
                type: String,
                required: true,
            },
            carModel: {
                type: String,
                required: true,
            },
            year: {
                type: String,
                required: true,
            },
            carType: {
                type: String,
                required: true,
            },
            regNo: {
                type: String,
                required: true,
            },
            carName: {
                type: String,
                required: true,
            },
        },
        carCalendarSchedule: {
            status: {
                type: String,
                required: true
            },
            dates: {
                type: [Date],
                required: true,
            },
        },
        carPricing: {
            currency: {
                type: String,
                required: true,
            },
            securityDeposit: {
                type: Number,
                required: true,
            },
            hourly_booking: {
                min_hours: {
                    type: Number,
                },
                min_hourly_price: {
                    type: Number,
                },
                price_per_hour: {
                    type: Number,
                },
            },
            daily_booking: {
                min_days: {
                    type: Number,
                },
                min_daily_price: {
                    type: Number,
                },
                price_per_day: {
                    type: Number,
                },
            },
            weekly_booking: {
                min_weeks: {
                    type: Number,
                },
                min_weekly_price: {
                    type: Number,
                },
                price_per_week: {
                    type: Number,
                },
            },
            monthly_booking: {
                min_months: {
                    type: Number,
                },
                min_monthly_price: {
                    type: Number,
                },
                price_per_month: {
                    type: Number,
                },
            },
        },
        carDesc: {
            desc: {
                type: String,
                required: true,
            },
            requestToBook: {
                type: Boolean,
            },
            instantPay: {
                type: Boolean,
            },
        },
        carPhotos: {
            type: [String]
        },
        carSpecs: {
            transmissionType: {
                type: String,
                required: true,
            },
            fuelType: {
                type: String,
                required: true,
            },
            doors: {
                type: Number,
                required: true,
            },
            safetyAmenity: {
                type: String,
                required: true,
            },
            entertainmentAmenity: {
                type: String,
                required: true,
            },
            powerLock: {
                type: String,
                required: true,
            },
            seatingCapacity: {
                type: Number,
                required: true,
            },
            airBags: {
                type: String,
                required: true,
            },
            mileage: {
                type: Number,
                required: true,
            },
            tankCapacity: {
                type: Number,
                required: true,
            },
            childSeats: {
                type: String,
                required: true
            },
        },
        carPickUpAddress: {
            city: {
                type: String,
                required: true,
            },
            street_address: {
                type: String,
            },
            zipcode: {
                type: String,
            },
            address_desc: {
                type: String,
            },
        },
        carCancellationPolicy: {
            cancellation_policy: {
                type: String,
                required: true,
            },
            return_amount: {
                type: Number,
                required: true,
            },
            desc: {
                type: String,
            },
        },
        approvalStatus: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Listing", ListingSchema);