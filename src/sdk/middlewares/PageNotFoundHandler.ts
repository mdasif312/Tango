import * as express from 'express';
import HttpException from "../exceptions/HttpException";
import BaseResponse from "../responses/BaseResponse";

function pageNotFoundHandler(request: express.Request, response: express.Response, next) {
    next(BaseResponse.pageNotFoundErrorResponse());
}

export default pageNotFoundHandler;
