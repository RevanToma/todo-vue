import { PrismaClient } from "@prisma/client";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolver";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";

const express = require("express");

const startServer = async () => {
  try {
    //  Prisma Client
    const prisma = new PrismaClient();

    //  Express
    const app = express();
    app.use(express.json());
    app.use(
      cors({
        origin: ["http://localhost:5173", "https://studio.apollographql.com"],
        credentials: true,
      })
    );

    interface Context {
      prisma: PrismaClient;
    }

    //  Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: (): Context => ({ prisma }),
    });

    // Start Apollo Server
    await server.start();

    //  Apollo server as middleware to the express app
    server.applyMiddleware({ app, cors: false });

    // Start listening for HTTP requests on the express app
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(
        `Server is running on http://localhost:${PORT}${server.graphqlPath}`
      );
    });

    console.log("Server started successfully");
  } catch (error: any) {
    console.error("Error starting the server:", error.message);
  }
};

startServer();
