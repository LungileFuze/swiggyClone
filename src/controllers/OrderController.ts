import Order from "../models/Order"


export class OrderController {

    static async placeOrder(req, res, next) {
        const data = req.body
        const user_id = req.user_id
        const restuarant = req.restuarant
        try {
            let orderData: any = {
                user_id,
                restuarant_id: data.restuarant_id,
                order: data.order,
                address: data.address,
                status: data.status,
                payment_status: data.payment_status,
                payment_mode: data.payment_mode,
                total: data.total,
                grandTotal: data.grandTotal,
                deliveryCharge: data.deliveryCharge
            }
            if(data.instruction) orderData = {...orderData, instruction: data.instruction}
            const order = await new Order(orderData).save()

            const response_order = {
                restuarant_id: restuarant,
                address: order.address,
                order: JSON.parse(order.order),
                instruction: order.instruction || null,
                grandTotal: order.grandTotal,
                total: order.total,
                deliveryCharge: order.deliveryCharge,
                status: order.status,
                payment_status: order.payment_status,
                payment_mode: order.payment_mode,
                create_at: order.created_at,
                updated_at: order.updated_at
            }
            res.send(response_order)
        }catch(e) {
            next(e)
        }
    }

    static async getUserOrders(req, res, next) {
        const user_id = req.user.aud
        const perPage = 5
        const currentPage = parseInt(req.query.page) || 1
        const prevPage = currentPage == 1 ? null : currentPage -1
        let nextPage = currentPage + 1
        try {
            const orders_doc_count = await Order.countDocuments({user_id: user_id})
                //send empty array if no documenton filterquery exists
                if(!orders_doc_count) {
                    res.json({
                        orders: [],
                        perPage,
                        currentPage,
                        prevPage,
                        nextPage: null,
                        totalPages: 0,
                        // totalRecords: orders_doc_count
                    })
                }
            const totalPages = Math.ceil(orders_doc_count / perPage)
            if(totalPages == 0 || totalPages === currentPage) {
                nextPage = null
            }
            if(totalPages < currentPage) {
                throw('No more Orders available')
            }

            const orders = await Order.find({user_id}, {user_id: 0, __v: 0})
            .skip((perPage * currentPage) - perPage)
            .limit(perPage)
            .sort({ 'created_at': -1})
            .populate('restuarant_id').exec()
            // res.send(orders)
            res.json({
                orders,
                perPage,
                currentPage,
                prevPage,
                nextPage,
                totalPages,
                // totalRecords: orders_doc_count
            })
        } catch(e) {
            next(e)
        }
    }
}