"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function getUserById(userId) {
    return await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
}
exports.getUserById = getUserById;
//# sourceMappingURL=user.js.map