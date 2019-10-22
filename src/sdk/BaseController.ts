import * as express from 'express';
import BaseModel from "./models/base.model";
import BasePresenter from "./BasePresenter";
import CommonEndPoints from "./utils/CommonEndPoints";
import validationMiddleware from "./middlewares/ValidationMiddleware";
import CreateBookDto from "../book.tdo";
import {Controller} from "@overnightjs/core";

@Controller("/")
class BaseController<T extends BaseModel> {
    public endPoint;
    public router = express.Router();

    private readonly collectionName;
    private readonly baseModel: BaseModel;
    private basePresenter: BasePresenter<T>;

    getModel() {
        return this.baseModel;
    }

    constructor(endPoint: string, collectionName: string, cls) {
        this.endPoint = endPoint;
        this.collectionName = collectionName;
        this.baseModel = new BaseModel(this.collectionName, cls.schema);
        this.basePresenter = new BasePresenter<T>(endPoint, this.baseModel);
        this.initializeRoutes();
    }

    //mapping router with functions
    private initializeRoutes() {
        this.router.post(this.endPoint + CommonEndPoints.CREATE, this.basePresenter.create);
        this.router.post(this.endPoint + CommonEndPoints.FIND, validationMiddleware(CreateBookDto), this.basePresenter.find);
        this.router.post(this.endPoint + CommonEndPoints.FIND_ONE, this.basePresenter.findOne);
        this.router.post(this.endPoint + CommonEndPoints.MODIFY, this.basePresenter.modify);
        this.router.post(this.endPoint + CommonEndPoints.DELETE_DATA, this.basePresenter.deleteData);

    }


}

export default BaseController;
