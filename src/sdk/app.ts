import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';

import loggerMiddleware from "./middlewares/Logger";
import BaseController from "./BaseController";
import BaseModel from "./models/base.model";
import errorHandlerMiddleware from "./middlewares/ErrorHandler";
import {Server} from "@overnightjs/core";
import pageNotFoundHandler from "./middlewares/PageNotFoundHandler";
import BasePresenter from "./BasePresenter";

class App {
    public app: express.Application;

    constructor(controllers: BaseController<BaseModel, BasePresenter>[]) {
        this.app = express();
        App.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializePageNotFoundHandler();
        this.initializeErrorHandler();
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        });
    }

    private initializePageNotFoundHandler() {
        this.app.use(pageNotFoundHandler);
    }

    private initializeMiddlewares() {

        this.app.use(loggerMiddleware);
        this.app.use(bodyParser.json());
        this.app.use(
            bodyParser.urlencoded({
                extended: false
            })
        );
    }

    private initializeErrorHandler() {
        this.app.use(errorHandlerMiddleware);

    }

    private initializeControllers(controllers: BaseController<BaseModel, BasePresenter>[]) {

        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private static connectToTheDatabase() {
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_PATH,
        } = process.env;
        mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
    }
}

export default App
