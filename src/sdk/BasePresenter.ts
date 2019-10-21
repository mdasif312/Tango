import * as express from 'express';

import BaseModel from "./models/base.model";
import BaseResponse from "./responses/BaseResponse";

class BasePresenter<T extends BaseModel> {
    public path = '/';
    public baseModel: BaseModel;

    constructor(path: string, baseModel: BaseModel) {
        this.path = path;
        this.baseModel = baseModel;
    }


    public find = (request: express.Request, response: express.Response) => {
        this.baseModel.getModelSchema().find(request.body.query)
            .then((data) => {
                if (data != null && data.length != 0)
                    response.json(BaseResponse.getSuccessResponse(data));
                else
                    response.json(BaseResponse.getEmptyResponse());
            });
    };

    public findOne = (request: express.Request, response: express.Response) => {
        // const id = request.params.id;
        if (request.body.id != null)
            this.baseModel.getModelSchema().findById(request.body.id)
                .then((data) => {
                    if (data != null)
                        response.json(BaseResponse.getSuccessResponse(data));
                    else
                        response.json(BaseResponse.getEmptyResponse());
                });
        else
            response.json(BaseResponse.invalidParamsErrorResponse());
    };

    public modify = (request: express.Request, response: express.Response) => {
        // const id = request.params.id;
        if (request.body.id != null) {
            delete request.body.id;     //removing id from body data for updation
            const postData: BaseModel = request.body;
            this.baseModel.getModelSchema().findByIdAndUpdate(request.body.id, postData, {new: true})
                .then((data) => {
                    if (data != null)
                        response.json(BaseResponse.getSuccessResponse(data));
                    else
                        response.json(BaseResponse.getStandardErrorResponse());
                });
        } else
            response.json(BaseResponse.invalidParamsErrorResponse());
    };

    public create = (request: express.Request, response: express.Response) => {
        const postData: BaseModel = request.body;
        const createdPost = new (this.baseModel.getModelSchema())(postData);
        createdPost.save()
            .then((savedPost) => {
                if (savedPost != null)
                    response.json(BaseResponse.getSuccessResponse(savedPost));
                else
                    response.json(BaseResponse.getStandardErrorResponse());
            });
    };

    public deleteData = (request: express.Request, response: express.Response) => {
        // const id = request.params.id;
        if (request.body.id != null)
            this.baseModel.getModelSchema().findByIdAndDelete(request.body.id)
                .then((successResponse) => {
                    if (successResponse) {
                        response.json(BaseResponse.getSuccessResponse(null));
                    } else {
                        response.send(BaseResponse.getStandardErrorResponse());
                    }
                });
        else
            response.json(BaseResponse.invalidParamsErrorResponse());
    };
}

export default BasePresenter;
