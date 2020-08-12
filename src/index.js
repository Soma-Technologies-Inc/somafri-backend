import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import jwt from 'jsonwebtoken';
import DataLoader from 'dataloader';
import express from 'express';
import {
  ApolloServer,
  AuthenticationError,
} from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './database/models';
import loaders from './loaders';
import verifyTokens from './helpers/verify.token';
import routes from './routes/index';

const app = express();

app.use(cors());


const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs: schema,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
        loaders: {
          user: new DataLoader(keys =>
            loaders.user.batchUsers(keys, models),
          ),
        },
      };
    }
    const token = req.headers.auth || '';
    const user = verifyTokens.verifyAllTokens(token);
    // add the user to the context
    return { user };

  },
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);
app.use('/soma',routes);
const port = process.env.PORT || 8000;


    app.listen({ port }, () => {
      console.log(`Apollo Server on http://localhost:${port}`);
    });

