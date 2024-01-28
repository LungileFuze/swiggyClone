import Category from "../models/Category"
import Item from "../models/Item"


export class ItemController {

    static async addItem(req, res, next) {
        const itemData = req.body
        const path = req.file.path
        try {
            //create item
            let item_data: any = {
                name: itemData.name,
                status: itemData.status,
                price: parseInt(itemData.price),
                veg: itemData.veg,
                category_id: itemData.category_id,
                restuarant_id: itemData.restuarant_id,
                cover: path
            }
            if(itemData.description) item_data = {...item_data, decription: itemData.decription}
            const itemDoc = await new Item(item_data).save()
            res.send(itemDoc)
        } catch(e) {
            next(e)
        }
    }

    static async getMenu(req, res, next) {
        const restuarant = req.restuarant
        try {
            const categories = await Category.find({restuarant_id: restuarant._id}, {__v: 0})
            const items = await Item.find(
                {
                    // status: true
                    restuarant_id: restuarant._id
                }
            )
            res.json({
                restuarant,
                categories,
                items
            })

        } catch(e) {
            next(e)
        }
    }
}