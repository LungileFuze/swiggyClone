import { body, param } from "express-validator"
import Restuarant from "../models/Restuarant"
import Category from "../models/Category"

export class ItemValidators {

    static addItem() {
        return [
            body('itemImages', 'Cover image is required')
            .custom((cover, {req}) => {
                if(req.file) {
                    return true
                } else {
                    throw('File not uploaded')
                }
            }),
            body('name', 'Item Name is required').isString(),
            body('restuarant_id', 'Restuarant Id is required').isString()
            .custom((restuarant_id, {req}) => {
                return Restuarant.findById(restuarant_id).then(restuarant => {
                    if(restuarant) {
                        return true
                    } else {
                        throw('Restuarant doesnt exist')
                    }
                }).catch(e => {
                    throw new Error(e)
                })
            }),
            body('category_id', 'Category Id is required').isString()
            .custom((category_id, {req}) => {
                return Category.findOne({_id: category_id, restuarant_id: req.body.restuarant_id})
                .then(category => {
                    if(category) {
                        return true
                    } else {
                        throw('Category doesnt exist')
                    }
                }).catch(e => {
                    throw new Error(e)
                })
            }),
            body('price', 'Price is required').isString(),
            body('veg', 'Item is veg or not').isBoolean(),
            body('status', 'Status is required').isBoolean(),
           
        ]
    }

    static getMenuItems() {
        return [
            param('restuarantId', 'Restuarant Id is required').isString()
            .custom((restuarant_id, {req}) => {
                return Restuarant.findById(restuarant_id).then(restuarant => {
                    if(restuarant) {
                        req.restuarant = restuarant
                        return true
                    } else {
                        throw('Restuarant doesnot exist')
                    }
                }).catch(e => {
                    throw new Error(e)
                })
            }),
        ]
    }
}