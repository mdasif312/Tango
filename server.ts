import 'dotenv/config';
import validateEnv from "./src/sdk/utils/validateEnv";
import App from "./src/sdk/app";
import BookController from "./src/BookController";

//validating environment variables of database
validateEnv();
const app = new App(
    [
        new BookController("/books", "books"),
    ]
);
app.listen();
