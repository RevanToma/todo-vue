import { gql } from "apollo-server-express";

const TodoTypes = gql`
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Mutation {
    addTodo(title: String!): Todo
    removeTodo(id: ID!): Boolean
    updateTodo(id: ID!, title: String, completed: Boolean): Todo
  }

  type Query {
    getTodos: [Todo!]!
  }
`;

export default TodoTypes;
