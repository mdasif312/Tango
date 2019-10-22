import HttpException from "./HttpException";

class InvalidParamsException extends HttpException {

    constructor() {
        super(0, 100, "Invalid Parameters");
    }

}

export default InvalidParamsException;
