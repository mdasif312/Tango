import * as express from 'express';
import HttpException from "../exceptions/HttpException";

function errorHandlerMiddleware(error: HttpException, request: express.Request, response: express.Response, next: express.nextFunction) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    response.send({
        status,
        message,
    });
}

export default errorHandlerMiddleware;
