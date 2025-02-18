import bcrypt from "bcrypt";
import config from "../../config";
import { jwtHelpers } from "../../utils/jwtHelpers";

interface IUserInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

interface IPost {
  title: string;
  content: string;
  published?: boolean;
}

export const Mutation = {
  signUp: async (parent: any, args: IUserInfo, { prisma }: any) => {
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

    if (args?.bio) {
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
    { prisma }: any
  ) => {
    const user = await prisma.user.findUnique({
      where: {
        email: args.email,
      },
    });

    if (!user) {
      return {
        errorMessage: "User not found",
      };
    }

    const isPasswordValid = await bcrypt.compare(args.password, user.password);

    if (!isPasswordValid) {
      return {
        errorMessage: "Invalid password",
      };
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

  addPost: async (parent: any, args: IPost, { prisma, userInfo }: any) => {
    // console.log(args);
    console.log(userInfo, "userInfo");

    if (!userInfo) {
      return {
        errorMessage: "Unauthorized",
      };
    }

    const newPost = await prisma.post.create({
      data: {
        title: args.title,
        content: args.content,
        published: args.published,
        authorId: userInfo.userId,
      },
    });

    return {
      post: newPost,
    };
  },
};
