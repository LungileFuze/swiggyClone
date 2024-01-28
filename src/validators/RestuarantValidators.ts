import { body, query } from 'express-validator'
import User from "../models/User"

export class RestuarantValidators {

    static addRestuarant() {
        return [
            body('name', 'Owner Name is required').isString(),
            body('email', 'Email is required').isEmail()
            .custom((email, {req}) => {
                return User.findOne({
                    email: email,
                }).then(user => {
                    if(user) {
                        throw('User already exist')
                    } else {
                        return true
                    }
                }).catch(e => {
                    throw new Error(e)
                })
            }),
            body('phone', "Phone Number is required").isString(),
            body('password', "Password is required").isAlphanumeric()
            .isLength({min: 5, max: 25})
            .withMessage("Password must between 5 and 25 characters"),
            body('restuarantImages', 'Cover image is required').isEmail()
            .custom((cover, {req}) => {
                    if(req.file) {
                        return true
                    } else {
                        throw('File not uploaded')
                    }
            }),
            body('res_name', "Restuarant name is required").isString(),
            body('short_name', 'Restuarant short name is required').isString(),
            body('openTime', 'Open time is required').isString(),
            body('closeTime',"Close time is required").isString(),
            body('price', "Price is required").isString(),
            body('delivery_time', "Delivery time is required").isString(),
            body('status', "Status is required").isString(),
            body('location', "Location is required").isString(),
            body('address', "Address is required").isString(),
            body('cuisines', "Cuisines is required").isString(),
            body('city_id', "City is is required").isString(),
        ]
    }

    static getNearbyRestuarants() {
        return [
            query('lat', "Latitude is required").isNumeric(),
            query('lng', "Longitude is is required").isNumeric(),
            query('radius', "Radius is is required").isNumeric(),
        ]
    }

    static searchNearbyRestuarants() {
        return [
            query('lat', "Latitude is required").isNumeric(),
            query('lng', "Longitude is is required").isNumeric(),
            query('radius', "Radius is is required").isNumeric(),
            query('name', "Search is required").isString(),
        ]
    }
}


