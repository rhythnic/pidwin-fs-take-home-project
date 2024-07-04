export class ServerError extends Error {
    constructor(message = "Something went wrong") {
        super(message);
        this.name = "ServerError";
    }
}