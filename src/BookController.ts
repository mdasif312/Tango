import BaseController from "./sdk/BaseController";
import Book from "./book.model";
import BookPresenter from "./BookPresenter";

class BookController extends BaseController<Book, BookPresenter> {


    constructor(endPoint, collectionName) {
        super(endPoint, collectionName, new Book());
        this.updateRouters();
    }

    private updateRouters() {
        this.addRoute("test", this.getPresenter().test);
    }

    attachPresenter(): BookPresenter {
        return new BookPresenter(new Book());
    }

}

export default BookController;
