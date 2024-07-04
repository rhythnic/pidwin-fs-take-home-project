export class ForbiddenError extends Error {
    constructor(message = "Unauthorized") {
        super(message);
        this.name = "ForbiddenError";
    }
}