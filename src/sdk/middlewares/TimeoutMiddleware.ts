import * as express from 'express';
import HttpException from "../exceptions/HttpException";
import BaseResponse from "../responses/BaseResponse";
import PageNotFoundException from "../exceptions/PageNotFoundException";
import TimeoutException from "../exceptions/TimeoutException";

function TimeoutMiddleware(request, response: express.Response, next) {
    if (request.timedout == true)
        throw new TimeoutException();
    else
        next();
}

export default TimeoutMiddleware;
