import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface IUserInfo {
  name: string;
  email: string;
  password: string;
}

export const resolvers = {
  Query: {
    users: async (parent: any, args: any, context: any) => {
      return await prisma.user.findMany();
    },
  },

  Mutation: {
    signUp: async (parent: any, args: IUserInfo, context: any) => {
      // console.log(args);
      const hashedPassword = await bcrypt.hash(args.password, 12);
      // console.log(hashedPassword);

      const newUser = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashedPassword,
        },
      });

      const token = jwt.sign(
        {
          userId: newUser.id,
          email: newUser.email,
        },
        "signature",
        {
          expiresIn: "1d",
        }
      );

      return {
        token,
      };
    },
  },
};
