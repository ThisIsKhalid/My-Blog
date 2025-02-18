import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import config from "../config";
import { jwtHelpers } from "../utils/jwtHelpers";

const prisma = new PrismaClient();

interface IUserInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
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
      // return;

      const user = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });

      if (user) {
        return {
          errorMessage: "User already exists",
        };
      }

      const hashedPassword = await bcrypt.hash(args.password, 12);
      // console.log(hashedPassword);

      const newUser = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashedPassword,
        },
      });

      if(args?.bio){
        await prisma.profile.create({
          data: {
            bio: args.bio,
            userId: newUser.id,
          },
        });
      }

      const token = jwtHelpers.generateToken(
        {
          userId: newUser.id,
          email: newUser.email,
        },
        config.jwt.jwt_secret as string,
        config.jwt.expires_in as string
      );

      return {
        token,
      };
    },

    signIn: async (
      parent: any,
      args: {
        email: string;
        password: string;
      },
      context: any
    ) => {
      const user = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });

      if (!user) {
        return {
          errorMessage: "User not found",
        }
      }

      const isPasswordValid = await bcrypt.compare(
        args.password,
        user.password
      );

      if (!isPasswordValid) {
        return {
          errorMessage: "Invalid password",
        }
      }

      const token = jwtHelpers.generateToken(
        {
          userId: user.id,
          email: user.email,
        },
        config.jwt.jwt_secret as string,
        config.jwt.expires_in as string
      );

      return {
        token,
      };
    },
  },
};
