import { Router } from "express";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { RestuarantController } from "../controllers/RestuarantController";
import { RestuarantValidators } from "../validators/RestuarantValidators";
import { Utils } from "../utils/Utils";
import Banner from "../models/Banner";

class RestuarantRouter {

    public router: Router

    constructor() {
        this.router = Router()
        this.getRoutes()
        this.postRoutes()
        this.patchRoutes()
        this.putRoutes()
        this.deleteRoutes()
    }

    getRoutes() {
        this.router.get('/getRestuarants', GlobalMiddleWare.auth, GlobalMiddleWare.adminRole,GlobalMiddleWare.checkError, RestuarantController.getRestuarants)
        this.router.get('/nearbyRestuarants', GlobalMiddleWare.auth,RestuarantValidators.getNearbyRestuarants(),GlobalMiddleWare.checkError, RestuarantController.getNearbyRestuarants)
        this.router.get('/searchNearbyRestuarants', GlobalMiddleWare.auth,RestuarantValidators.searchNearbyRestuarants(),GlobalMiddleWare.checkError, RestuarantController.searchNearbyRestuarants)

    }

    postRoutes() {
        this.router.post('/create', GlobalMiddleWare.auth, GlobalMiddleWare.adminRole, new Utils().multer.single('cover'), RestuarantValidators.addRestuarant(), GlobalMiddleWare.checkError, RestuarantController.addRestuarant)
    }

    patchRoutes() {}

    putRoutes() {}

    deleteRoutes() {}
}

export default new RestuarantRouter().router