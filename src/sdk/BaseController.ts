import * as express from 'express';

import BaseModel from "./models/base.model";
import BasePresenter from "./BasePresenter";

class BaseController<T extends BaseModel> {
    public endPoint = '/';
    public collectionName = "";
    public router = express.Router();
    private baseModel: BaseModel;
    private basePresenter: BasePresenter<T>;

    constructor(path: string, collectionName: string, cls) {
        this.endPoint = path;
        this.collectionName = collectionName;
        this.baseModel = new BaseModel(this.collectionName, cls.schema);
        this.basePresenter = new BasePresenter<T>(path, this.baseModel);
        this.initializeRoutes();
    }

    //mapping router with functions
    private initializeRoutes() {
        // this.router.get(this.endPoint, this.basePresenter.find);
        // this.router.get(`${this.endPoint}/:id`, this.basePresenter.findOne);
        // this.router.put(`${this.endPoint}/:id`, this.basePresenter.modify);
        // this.router.delete(`${this.endPoint}/:id`, this.basePresenter.deleteData);
        //
        this.router.post(this.endPoint + "/create", this.basePresenter.create);
        this.router.post(this.endPoint + "/find", this.basePresenter.find);
        this.router.post(this.endPoint + "/findOne", this.basePresenter.findOne);
        this.router.post(this.endPoint + "/modify", this.basePresenter.modify);
        this.router.post(this.endPoint + "/deleteData", this.basePresenter.deleteData);

    }


}

export default BaseController;
