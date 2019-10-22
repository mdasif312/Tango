import HttpException from "./HttpException";

class StandardException extends HttpException {

    constructor() {
        super(0, 300, "Something went wrong");
    }

}

export default StandardException;
