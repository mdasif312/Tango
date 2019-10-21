import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';

import loggerMiddleware from "./middlewares/Logger";
import BaseController from "./BaseController";
import BaseModel from "./models/base.model";
import analyticsMiddleWare from "./middlewares/Analytics";

class App {
    public app: express.Application;

    constructor(controllers: BaseController<BaseModel>[]) {
        this.app = express();

        App.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeAnalytics();
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        });
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

    private initializeAnalytics() {
        this.app.use(analyticsMiddleWare);
    }

    private initializeControllers(controllers: BaseController<BaseModel>[]) {
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
