import userResolvers from './user.resolvers';
import musicResolvers from './music.resolvers';
import { GraphQLDateTime } from 'graphql-iso-date';

export default [
  
  userResolvers,
  musicResolvers
];
