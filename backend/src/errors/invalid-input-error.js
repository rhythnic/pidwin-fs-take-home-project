export class InvalidInputError extends Error {
    constructor(message = "Invalid User Input") {
        super(message);
        this.name = "InvalidInputError";
    }
}