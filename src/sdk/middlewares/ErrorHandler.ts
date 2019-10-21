import * as express from 'express';

function errorHandlerMiddleware(request: express.Request, response: express.Response) {

    response.json({name: "Invalid request"});
}

export default errorHandlerMiddleware;
