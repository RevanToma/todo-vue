import TodoResolvers from "./todoTypes/TodoResolvers";
const resolvers = {
  Query: {
    ...TodoResolvers.Query,
  },
  Mutation: {
    ...TodoResolvers.Mutation,
  },
};

export default resolvers;
