import HttpException from "../exceptions/HttpException";
import InvalidParamsException from "../exceptions/InvalidParamsException";

class BaseResponse {

    result: number;
    message: string;
    data: any;

    constructor(result: number, message: string, data: any) {
        this.result = result;
        this.message = message;
        this.data = data;
    }


    static getSuccessResponse(data: any) {
        return new BaseResponse(1, "Success", data);
    }

    static getEmptyResponse() {
        return new BaseResponse(1, "No data found", null);
    }

}

export default BaseResponse;
