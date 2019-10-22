import 'dotenv/config';
import validateEnv from "./src/sdk/utils/validateEnv";
import App from "./src/sdk/app";
import BookController from "./src/BookController";
import DbConfig from "./src/sdk/database/db.config";

//validating environment variables of database
validateEnv();
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
const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_PATH,
} = process.env;
let dbConfig = new DbConfig(MONGO_USER, MONGO_PASSWORD, MONGO_PATH, {});
const app = new App(
    dbConfig,
    [
        new BookController("/books", "books"),
    ]
);
app.listen();
