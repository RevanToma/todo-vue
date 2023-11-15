import { PrismaClient } from "@prisma/client";
import { schema } from "./graphql/schema";
import { createYoga } from "graphql-yoga";
import { createServer } from "http";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolver";
import { ApolloServer } from "apollo-server-express";

const express = require("express");

const startServer = async () => {
  try {
    // Initialize Prisma Client
    const prisma = new PrismaClient();

    // Initialize Express
    const app = express();
    app.use(express.json());

    // Create Apollo Server instance
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: () => ({ prisma }),
    });

    // Start Apollo Server
    await server.start();

    // Apply Apollo Server as middleware to the Express app
    server.applyMiddleware({ app });

    // Start listening for HTTP requests on the Express app
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
