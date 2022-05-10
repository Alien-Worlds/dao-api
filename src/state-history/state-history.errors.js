class ServiceNotConnectedError extends Error {
    constructor() {
        super(`Client is not connected, requestBlocks cannot be called`);
    }
}

class UnhandledMessageTypeError extends Error {
    constructor(type) {
        super(`Unhandled message type: ${type}`);
        this.type = type;
    }
}

class UnhandledMessageError extends Error {
    constructor(message) {
        super('Received a message while no block range is being processed');
        this.message = message;
    }
}

class MissingHandlersError extends Error {
    constructor() {
        super('Set handlers before calling connect()');
    }
}

class UnhandledBlocksRequestError extends Error {
    constructor(blocksRange) {
        super(`Error sending the block_range request ${blocksRange.key}. The current request was not completed or canceled.`);
    }
}

module.exports = {
    ServiceNotConnectedError,
    UnhandledMessageTypeError,
    UnhandledMessageError,
    MissingHandlersError,
    UnhandledBlocksRequestError,
};