const TodoResolvers = {
  Mutation: {
    addTodo: async (_parent: any, args: any, context: any) => {
      return await context.prisma.todo.create({
        data: {
          title: args.title,
          completed: false, // default value
        },
      });
    },
  },
  Query: {},
};

export default TodoResolvers;
