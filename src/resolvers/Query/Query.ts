export const Query = {
  users: async (parent: any, args: any, context: any) => {
    const { prisma } = context;

    return await prisma.user.findMany();
  },

  posts: async (parent: any, args: any, context: any) => {
    const { prisma } = context;

    return await prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        author: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  },
};
