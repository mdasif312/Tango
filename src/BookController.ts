import BaseController from "./sdk/BaseController";
import Book from "./book.model";

class BookController extends BaseController<Book> {


    constructor(endPoint, collectionName) {
        super(endPoint, collectionName, Book);

    }

}

export default BookController;
