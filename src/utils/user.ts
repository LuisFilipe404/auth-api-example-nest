// userFunctions.js
import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

export async function getUserById(userId): Promise<User> {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}
