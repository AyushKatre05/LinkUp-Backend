import prisma from "./config/db.config.js";
export const storeMessageInDB = async (message: any) => {
  try {
    await prisma.chats.create({
      data: message,
    });
  } catch (error) {
    console.error("Error storing message in DB", error);
  }
};
