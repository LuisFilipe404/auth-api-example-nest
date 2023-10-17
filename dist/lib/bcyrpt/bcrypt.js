"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPass = exports.compareHashes = void 0;
const bcrypt = require("bcrypt");
async function compareHashes(hash1, hash2) {
    return await bcrypt.compare(hash1, hash2);
}
exports.compareHashes = compareHashes;
async function hashPass(pass) {
    return await bcrypt.hash(pass, 10);
}
exports.hashPass = hashPass;
//# sourceMappingURL=bcrypt.js.map