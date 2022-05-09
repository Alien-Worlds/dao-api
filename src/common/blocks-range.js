const { Int64BE } = require("int64-buffer");

class BlocksRange {
    _start;
    _end;

    static create(message) {
        const startBuffer = message.content.slice(0, 8);
        const endBuffer = message.content.slice(8);
        const startBlock = new Int64BE(startBuffer).toString();
        const endBlock = new Int64BE(endBuffer).toString();
        
        return new BlocksRange(startBlock, endBlock);
    }

    constructor(start, end){
        this._start = start;
        this._end = end;
    }

    get start() {
        return parseInt(this._start);
    }
    
    get end() {
        return parseInt(this._end);
    }
    
    get key() {
        return `${this._start}_${this._end}`;
    }
}

module.exports = { BlocksRange };