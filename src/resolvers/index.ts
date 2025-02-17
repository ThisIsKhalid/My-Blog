import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {},

  Mutation: {
    signUp: async (parent: any, args: any, context: any) => {
      // console.log(args);

      return await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: args.password,
        },
      });
    },
  },
};
