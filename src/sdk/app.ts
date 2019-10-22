import * as bodyParser from 'body-parser';
import * as express from 'express';

import loggerMiddleware from "./middlewares/LoggerMiddleware";
import BaseController from "./BaseController";
import BaseModel from "./models/base.model";
import errorHandlerMiddleware from "./middlewares/ErrorHandlerMiddleware";
import pageNotFoundMiddleware from "./middlewares/PageNotFoundMiddleware";
import BasePresenter from "./BasePresenter";
import CheckForDBConnectionHandler from "./middlewares/CheckForDBConnectionMiddleware";
import DbConfig from "./database/db.config";
import DBConnector from "./database/DBConnector";
import TimeoutMiddleware from "./middlewares/TimeoutMiddleware";
import * as timeout from "connect-timeout";

class App {
    public app: express.Application;
    private dbConfig: DbConfig;


    private initializeTimeoutMiddleware() {
        this.app.use(timeout("5s"));
        this.app.use(bodyParser.json());
        this.app.use(TimeoutMiddleware);
    }

    constructor(dbConfig: DbConfig, controllers: BaseController<BaseModel, BasePresenter>[]) {
        this.app = express();
        this.dbConfig = dbConfig;
        this.connectToTheDatabase();
        this.initializeLoggerMiddleware();
        this.initializeTimeoutMiddleware();
        this.initializeDBConnectionCheckMiddleware();
        this.initializeControllers(controllers);
        this.initializePageNotFoundMiddleware();
        this.initializeErrorMiddleware();
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        });
    }

    private initializeDBConnectionCheckMiddleware() {
        this.app.use(CheckForDBConnectionHandler);
    }

    private initializePageNotFoundMiddleware() {
        this.app.use(pageNotFoundMiddleware);
    }

    private initializeLoggerMiddleware() {

        this.app.use(loggerMiddleware);
        this.app.use(bodyParser.json());
        this.app.use(
            bodyParser.urlencoded({
                extended: false
            })
        );
    }

    private initializeErrorMiddleware() {
        this.app.use(errorHandlerMiddleware);

    }

    private initializeControllers(controllers: BaseController<BaseModel, BasePresenter>[]) {

        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private async connectToTheDatabase() {
        try {
            await new DBConnector(this.dbConfig).connect();
        } catch (e) {
            console.log("Error connecting the database");
        }
    }
}

export default App
