import * as express from 'express';
import BaseResponse from "../responses/BaseResponse";

function analyticsMiddleware(request: BaseResponse, response: express.Response) {

    console.log(request);
    // response.json({name: "Invalid request"});
}
export default analyticsMiddleware;
