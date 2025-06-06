import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import { typeDefs } from './schemas/typeDefs.js';
import { resolvers } from './resolvers/index.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('📦 MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
const PORT = 4000;
const app: Application = express();
app.use(graphqlUploadExpress());

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();
await connectToMongo();
server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});
