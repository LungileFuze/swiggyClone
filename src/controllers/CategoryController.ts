import Category from "../models/Category"

export class CategoryController {

    static async getCategories(req, res, next) {
        try {
            const restuarant_id = req.params.restuarant_id;
            const categories = await Category.find({ restuarant_id: restuarant_id, __v:0})
            //.populate('restuarant_id').exec()
            res.send(categories)
        } catch(e) {
            next(e)
        }
    }
}