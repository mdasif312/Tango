import BaseController from "./sdk/BaseController";
import Book from "./book.model";

class BookController extends BaseController<Book> {


    constructor(endPoint, collectionName) {
        super(endPoint, collectionName, Book);
        this.updateRouters();

    }

    updateRouters() {
        this.router.get(this.endPoint + "/test", (req, res) => {
            console.log("hey")
        });

        this.router.post(this.endPoint+"/deete",(req,res)=>{

            this.getModel().getModelSchema().update({});
        });
    }


}

export default BookController;
