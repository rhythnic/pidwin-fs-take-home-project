class ForbiddenError extends Error {
    constructor(message = "Unauthorized") {
        super(message);
        this.name = "ForbiddenError";
    }
}

export default ForbiddenError