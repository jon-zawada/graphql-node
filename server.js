const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const app = express();

// Dummy data
let todos = [
  { id: "1", title: "Buy groceries", completed: false },
  { id: "2", title: "Clean the house", completed: true },
  { id: "3", title: "Finish project", completed: false },
];

// GraphQL Schema
const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Query {
    todos: [Todo!]!
    todo(id: ID!): Todo
  }

  type Mutation {
    addTodo(title: String!): Todo!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    todos: () => todos,
    todo: (_, { id }) => todos.find((todo) => todo.id === id),
  },
  Mutation: {
    addTodo: (_, { title }) => {
      const newTodo = { id: String(todos.length + 1), title, completed: false };
      todos.push(newTodo);
      return newTodo;
    },
  },
};

// Start Apollo Server
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
}

startServer();
