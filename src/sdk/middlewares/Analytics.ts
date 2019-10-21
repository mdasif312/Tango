import * as express from 'express';

function analyticsMiddleWare(request: express.Request, response: express.Response, next) {
    console.log(`In Analytics Layer ${request.method} ${request.path}`);
    next();
}

export default analyticsMiddleWare;
