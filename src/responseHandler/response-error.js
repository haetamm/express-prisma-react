class ResponseError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.code = status; // Adding code property to match the desired response format
    }
}

export {
    ResponseError
}
