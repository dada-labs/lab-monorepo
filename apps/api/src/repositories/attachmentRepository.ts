import prisma from "../config/prisma.js";

export const findById = async (id: string) => {
  return await prisma.attachment.findUnique({
    where: { id },
  });
};

export const deleteById = async (id: string) => {
  return await prisma.attachment.delete({
    where: { id },
  });
};
