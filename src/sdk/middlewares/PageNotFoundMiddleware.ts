import * as express from 'express';
import HttpException from "../exceptions/HttpException";
import BaseResponse from "../responses/BaseResponse";
import PageNotFoundException from "../exceptions/PageNotFoundException";

function pageNotFoundMiddleware(request: express.Request, response: express.Response, next) {
    //if control comes here, it means it has skipped all the controllers, hence page looking for was not found
    throw  new PageNotFoundException();
}

export default pageNotFoundMiddleware;
