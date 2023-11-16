import { gql } from "apollo-server-express";
import TodoTypes from "./todoTypes/TodoTypes";

const Base = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const typeDefs = [TodoTypes, Base];

export default typeDefs;
