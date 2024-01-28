import { Router } from "express";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { CategoryController } from "../controllers/CategoryController";

class CategoryRouter {

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
        this.router.get('/getCategories/:restuarant_id', GlobalMiddleWare.auth, CategoryController.getCategories)
    }
    postRoutes() {}
    patchRoutes() {}
    putRoutes() {}
    deleteRoutes() {}
}

export default new CategoryRouter().router