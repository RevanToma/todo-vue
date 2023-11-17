import gql from 'graphql-tag'

export const GET_TODOS = gql`
  query getTodos {
    getTodos {
      id
      title
      completed
      todoType
    }
  }
`

export const REMOVE_TODO = gql`
  mutation removeTodo($id: ID!) {
    removeTodo(id: $id)
  }
`

export const UPDATE_TODO = gql`
  mutation updateTodo($id: ID!, $title: String, $completed: Boolean) {
    updateTodo(id: $id, title: $title, completed: $completed) {
      id
      title
      completed
    }
  }
`
export const ADD_TODO = gql`
  mutation addTodo($title: String!, $todoType: String!) {
    addTodo(title: $title, todoType: $todoType) {
      id
      title
      completed
      todoType
    }
  }
`
