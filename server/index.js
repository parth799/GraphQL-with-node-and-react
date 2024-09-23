import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const typeDefs = ` 
    type Todo {
        id: ID!
        userId: ID!
        title: String!
        completed: Boolean
        user: User
    }
    type User {
        id: ID!
        name: String!
        username: String!
        email: String!
        phone: String!
    }
    
    type Query {
        getTodos: [Todo]
        getAllUsers: [User]
        getUserById(id: ID!): User
    }
`;

const resolvers = {
    Todo: {
        user: async (todo) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data, // Fixed to use todo.userId
    },
    Query: {
        getTodos: async () => (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
        getAllUsers: async () => (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
        getUserById: async (_, { id }) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data, // Fixed destructuring
    },
};

async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();

    app.use(bodyParser.json());
    app.use(cors());

    app.use(
        "/graphql",
        expressMiddleware(server)
    );

    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000`)
    );
}

startServer();
