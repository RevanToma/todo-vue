import { gql } from "apollo-server-express";

const TodoTypes = gql`
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Mutation {
    addTodo(title: String!): Todo
  }

  type Query {
    hello: String
  }
`;

export default TodoTypes;
