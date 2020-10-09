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
import bodyParser from 'body-parser';
import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './database/models';
import loaders from './loaders';
import verifyTokens from './helpers/verify.token';
import routes from './routes/index';

import db from "./database/models";


const app = express();

app.use(cors());
app.use(express.json());
app.use(cors());
app.use(express.static('src/assets/files'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
    const userData = await verifyTokens.verifyAllTokens(token);
    if (userData){
      const user = await db.user.findOne({ where: { id:userData.id } });
      return { user };
    }

  },
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);
app.use('/soma',routes);
app.get('/', (req, res) => res.status(200).send({ status: 200, message: 'Welcome to Soma!' }));
app.use((req, res) => res.status(404).send({
  status: 404,
  error: 'route Not Found!',
}));
const port = process.env.PORT || 8000;
    httpServer.listen({ port }, () => {
      console.log(`Apollo Server on http://localhost:${port}`);
    });
export default app