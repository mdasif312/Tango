import HttpException from "./HttpException";

class DBConnectionException extends HttpException {

    constructor() {
        super(0, 404, "DB not connected");
    }

}

export default DBConnectionException;
