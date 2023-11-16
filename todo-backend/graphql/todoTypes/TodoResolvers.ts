import { PrismaClient, Todo } from "@prisma/client";
import { TodoIdArgs, TodoUpdateArgs } from "../../types";

const TodoResolvers = {
  Mutation: {
    removeTodo: async (
      _parent: any,
      args: TodoIdArgs,
      context: { prisma: PrismaClient }
    ): Promise<Boolean> => {
      await context.prisma.todo.delete({
        where: { id: parseInt(args.id) },
      });
      return true;
    },
    updateTodo: async (
      _parent: any,
      args: TodoUpdateArgs,
      context: { prisma: PrismaClient }
    ) => {
      return await context.prisma.todo.update({
        where: { id: parseInt(args.id) },
        data: {
          title: args.title,
          completed: args.completed,
        },
      });
    },
    addTodo: async (
      _parent: any,
      args: any,
      context: { prisma: PrismaClient }
    ): Promise<Todo> => {
      return await context.prisma.todo.create({
        data: {
          title: args.title,
          completed: false,
        },
      });
    },
  },
  Query: {
    getTodos: async (_parent: any, _args: any, context: any) => {
      return await context.prisma.todo.findMany();
    },
  },
};

export default TodoResolvers;
