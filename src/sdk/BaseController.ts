import * as express from 'express';
import BaseModel from "./models/base.model";
import BasePresenter from "./BasePresenter";
import CommonEndPoints from "./utils/CommonEndPoints";
import validationMiddleware from "./middlewares/ValidationMiddleware";
import CreateBookDto from "../book.tdo";

abstract class BaseController<BM extends BaseModel, BP extends BasePresenter> {
    private readonly endPoint;
    public router = express.Router();

    private readonly collectionName;
    private readonly baseModel: BM;
    private basePresenter: BP;

    abstract attachPresenter();

    getPresenter(): BP {
        return this.basePresenter;
    }

    getModel(): BM {
        return this.baseModel;
    }

    protected constructor(endPoint: string, collectionName: string, baseModel: BM) {
        this.endPoint = endPoint;
        this.collectionName = collectionName;
        this.baseModel = baseModel;
        this.initializeRoutes();
    }

    //mapping router with functions
    private initializeRoutes() {
        this.basePresenter = this.attachPresenter();
        this.router.post(this.endPoint + CommonEndPoints.CREATE, this.basePresenter.create);
        this.router.post(this.endPoint + CommonEndPoints.FIND, validationMiddleware(CreateBookDto), this.basePresenter.find);
        this.router.post(this.endPoint + CommonEndPoints.FIND_ONE, this.basePresenter.findOne);
        this.router.post(this.endPoint + CommonEndPoints.MODIFY, this.basePresenter.modify);
        this.router.post(this.endPoint + CommonEndPoints.DELETE_DATA, this.basePresenter.deleteData);

    }

    //
    // public addRouteWithValidator(endPoint, validationMiddleWare, callback): void {
    //     this.router.post(this.endPoint + "/" + endPoint, validationMiddleWare, callback);
    // }

    public addRoute(endPoint, callback) {
        this.router.post(this.endPoint + "/" + endPoint, callback);
    }


}

export default BaseController;
