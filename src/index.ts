import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { JwtPayload } from "jsonwebtoken";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";
import { jwtHelpers } from "./utils/jwtHelpers";

interface IContext {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  userInfo: JwtPayload | null;
}

const prisma = new PrismaClient();

const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }): Promise<IContext> => {
      const userInfo = await jwtHelpers.getUserInfroFromToken(
        req.headers.authorization as string
      );

      return {
        prisma,
        userInfo,
      };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

main();
