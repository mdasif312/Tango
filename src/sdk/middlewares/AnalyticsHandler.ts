import * as express from 'express';
import BaseResponse from "../responses/BaseResponse";

function analyticsMiddleware(data, request, response) {

    console.log("Inside analytics middleware");

    console.log(JSON.stringify(data));
    console.log(request)
    // response.json({name: "Invalid request"});
}

export default analyticsMiddleware;
