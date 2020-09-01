import userResolvers from './user.resolvers';
import musicResolvers from './audio.resolvers';
import videoResolvers from './video.resolvers';
import translationResolver from './translation.resolvers';
import { GraphQLDateTime } from 'graphql-iso-date';


export default [
  
  userResolvers,
  musicResolvers,
  videoResolvers,
  translationResolver
];
