import { body } from "express-validator"
import Restuarant from "../models/Restuarant"


export class OrderValidators {

    static placeOrder() {
        return [
            body('restuarant_id', 'Restuarant Id is required').isString()
            .custom((restuarant_id, {req}) => {
                return Restuarant.findById(restuarant_id).then(restuarant => {
                    req.restuarant = restuarant
                    if(restuarant) {
                        return true
                    } else {
                        throw('Restuarant doesnt exist')
                    }
                }).catch(e => {
                    throw new Error(e)
                })
            }),
            body('order', 'Order is required').isString(),
            body('address', 'Address Id is required').isString(),
            body('status', 'Order status is required').isString(),
            body('payment_status', 'Payment status is required ').isBoolean(),
            body('payment_mode', 'Payment mode is required').isString(),
            body('total', 'Total is required').isNumeric(),
            body('grandTotal', 'Grand Total is required').isNumeric(),
            body('deliveryCharge', 'Delivery Charge is required').isNumeric(),
            
           
        ]
    }

}