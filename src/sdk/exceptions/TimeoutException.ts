import HttpException from "./HttpException";

class TimeoutException extends HttpException {

    constructor() {
        super(0, 302, "Request timed out");
    }

}

export default TimeoutException;
