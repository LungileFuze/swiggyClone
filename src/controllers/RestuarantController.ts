import Category from "../models/Category";
import Restuarant from "../models/Restuarant";
import User from "../models/User";
import { Utils } from "../utils/Utils";

export class RestuarantController{

    static async addRestuarant(req, res, next)  {
        const restuarant = req.body
        const path = req.file.path
        const verification_token = Utils.generateVerificationToken()
        try {
            const hash = await Utils.encryptPassword(restuarant.password)
            const data = {
                email: restuarant.email,
                verification_token,
                verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
                phone: restuarant.phone,
                password: hash,
                name: restuarant.name,
                type: 'restuarant',
                status: 'active'
            }
            
            const user = await new User(data).save()
            
            //create restuarant
            let restuarant_data: any = {
                name: restuarant.res_name,
                short_name: restuarant.short_name,
                location: JSON.parse(restuarant.location),
                address: restuarant.address,
                openTime: restuarant.openTime,
                closeTime: restuarant.closeTime,
                status: restuarant.status,
                cuisines: JSON.parse(restuarant.cuisines),
                price: parseInt(restuarant.price),
                delivery_time: parseInt(restuarant.delivery_time),
                city_id: restuarant.city_id,
                user_id: user._id,
                cover: path
            };
            if(restuarant.description) restuarant_data = {...restuarant_data, description: restuarant.description};
            const restuarantDoc = await new Restuarant(restuarant_data).save()

             //create categories
             const categoriesData = JSON.parse(restuarant.categories).map(x => {
                return {name: x, restuarant_id: restuarantDoc._id}
            })
            const categories = await Category.insertMany(categoriesData)

            res.send(restuarantDoc)
        }catch(e) {
            next(e)
        }
    }

    static async getNearbyRestuarants(req, res, next) {
        // const METERS_PER_MILE = 1609.34
        const data = req.query
        // const METERS_PER_KM = 1000
        // const  EARTH_RADIUS_IN_MILE = 3963.2
        const  EARTH_RADIUS_IN_KM = 6378.1
        try {
            const restuarants = await Restuarant.find(
                {
                    status: 'active',
                    location: {
                        // $nearSphere: {
                        //     $geometry:
                        //     {
                        //         type: "Point",
                        //         coordinates: [ parseFloat(data.lng), parseFloat(data.lat) ]
                        //     },
                        //     $maxDistance: data.radius * METERS_PER_KM
                        // }

                        $geoWithin: {
                            $centerSphere: [
                                [parseFloat(data.lng), parseFloat(data.lat)],
                                (parseFloat(data.radius)/1.6) / EARTH_RADIUS_IN_KM
                            ]
                        }
                    }
                })
            res.send(restuarants)
        } catch (e) {
            next(e)
        }
    }

    static async searchNearbyRestuarants(req, res, next) {
        // const METERS_PER_MILE = 1609.34
        const data = req.query
        // const METERS_PER_KM = 1000
        // const  EARTH_RADIUS_IN_MILE = 3963.2
        const  EARTH_RADIUS_IN_KM = 6378.1
        try {
            const restuarants = await Restuarant.find(
                {
                    status: 'active',
                    name: {$regex: data.name, $options: 1},
                    location: {
                        // $nearSphere: {
                        //     $geometry:
                        //     {
                        //         type: "Point",
                        //         coordinates: [ parseFloat(data.lng), parseFloat(data.lat) ]
                        //     },
                        //     $maxDistance: data.radius * METERS_PER_KM
                        // }

                        $geoWithin: {
                            $centerSphere: [
                                [parseFloat(data.lng), parseFloat(data.lat)],
                                (parseFloat(data.radius)/1.6) / EARTH_RADIUS_IN_KM
                            ]
                        }
                    }
                })
            res.send(restuarants)
        } catch (e) {
            next(e)
        }
    }

    static async getRestuarants(req, res, next) {
        try {
            const restuarants = await Restuarant.find(
                {
                    status: 'active'
                }
            )
            res.send(restuarants)
        }catch(e) {
            next(e)
        }
    }
}