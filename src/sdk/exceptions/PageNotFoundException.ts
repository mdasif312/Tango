import HttpException from "./HttpException";

class PageNotFoundException extends HttpException {

    constructor() {
        super(0, 404, "Page not found");
    }

}
export default PageNotFoundException;
