import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';

import loggerMiddleware from "./middlewares/LoggerMiddleware";
import BaseController from "./BaseController";
import BaseModel from "./models/base.model";
import errorHandlerMiddleware from "./middlewares/ErrorHandlerMiddleware";
import pageNotFoundMiddleware from "./middlewares/PageNotFoundMiddleware";
import BasePresenter from "./BasePresenter";
import CheckForDBConnectionHandler from "./middlewares/CheckForDBConnectionMiddleware";

class App {
    public app: express.Application;

    constructor(controllers: BaseController<BaseModel, BasePresenter>[]) {
        this.app = express();
        App.connectToTheDatabase();
        this.initializeLoggerMiddleware();
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

    private static connectToTheDatabase() {
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_PATH,
        } = process.env;
        let dbURI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`;
        const options = {
            useNewUrlParser: true,
            reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
            reconnectInterval: 2000, // Reconnect every 500ms
            poolSize: 10, // Maintain up to 10 socket connections
            // If not connected, return errors immediately rather than waiting for reconnect
            bufferMaxEntries: 0,
            connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4, // Use IPv4, skip trying IPv6
            // useMongoClient: true,
            server: {auto_reconnect: true}
        };
        let db = mongoose.connection;

        db.on("connecting", function () {
            console.log("connecting to MongoDB...");
        });

        db.on("error", function (error) {
            console.error("Error in MongoDb connection: " + error);
            mongoose.disconnect();
        });
        db.on("connected", function () {
            console.log("MongoDB connected!");
        });
        db.once("open", function () {
            console.log("MongoDB connection opened!");
        });
        db.on("reconnected", function () {
            console.log("MongoDB reconnected!");
        });
        db.on("disconnected", function () {
            console.log("MongoDB disconnected!");
            mongoose.connect(
                dbURI,
                {server: {auto_reconnect: true}}
            );
        });
        mongoose.connect(
            dbURI,
            options,
            function (error) {
                // Check error in initial connection. There is no 2nd param to the callback.
                console.log("Database connection initiated...");
                if (error == null)
                    console.log("Connection Successful...");
                else
                    console.log("Error in connecting to database... ");
            }
        );

    }
}

export default App
