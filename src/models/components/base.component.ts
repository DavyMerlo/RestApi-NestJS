export class BaseComponent<T> {
    status_code: number;
    message: string | object;
    data?: T;

    constructor(statuscode: number, message: string, data?: T){
        this.status_code = statuscode;
        this.message = message;
        this.data = data;
    };
};