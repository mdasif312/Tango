import * as express from 'express';
import HttpException from "../exceptions/HttpException";
import BaseResponse from "../responses/BaseResponse";
import PageNotFoundException from "../exceptions/PageNotFoundException";

import * as mongoose from 'mongoose';
import DBConnectionException from "../exceptions/DBConnectionException";

function CheckForDBConnectionHandler(request: express.Request, response: express.Response, next) {

    if (mongoose.connection.readyState != 1)
        throw new DBConnectionException();
    else
        next();
}

export default CheckForDBConnectionHandler;
