import HttpException from "../exceptions/HttpException";

class BaseResponse {

    result: number;
    message: string;
    data: any;

    constructor(result: number, message: string, data: any) {
        this.result = result;
        this.message = message;
        this.data = data;
    }

    static getStandardErrorResponse() {
        return new HttpException(0, 200, "Something wen't wrong");
    }

    static invalidParamsErrorResponse() {
        return new HttpException(0, 201, "Invalid parameters");
    }

    static getSuccessResponse(data: any) {
        return new BaseResponse(1, "Success", data);
    }

    static getEmptyResponse() {
        return new BaseResponse(1, "No data found", null);
    }

    static pageNotFoundErrorResponse() {
        return new HttpException(0, 404, "Page Not found");
    }
}

export default BaseResponse;
