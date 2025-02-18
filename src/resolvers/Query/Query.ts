

export const Query = {
  users: async (parent: any, args: any, context: any) => {
    const { prisma } = context;



    return await prisma.user.findMany();
  },
};
