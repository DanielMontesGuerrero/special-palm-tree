"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
class Message {
    constructor(content, type = types_1.MessageType.INFO) {
        this.content = content;
        this.type = type;
    }
}
exports.default = Message;
