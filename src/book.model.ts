import BaseModel from "./sdk/models/base.model";

class Book extends BaseModel {

    static collectionName: string = "books";
    static schema = {
        name: String
    };

    constructor() {
        console.log("Book model const");
        super(Book.collectionName, Book.schema);

    }
}

export default Book;
