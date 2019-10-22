import * as express from 'express';
import HttpException from "../exceptions/HttpException";

function errorHandlerMiddleware(error: HttpException, request: express.Request, response: express.Response, next) {
    const opStatus = error.opStatus || 500;
    const message = error.message || 'Something went wrong';
    const result = error.result || 0;
    response.send({
        opStatus,
        message,
        result
    });
}

export default errorHandlerMiddleware;
