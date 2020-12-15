import userResolvers from './user.resolvers';
import musicResolvers from './audio.resolvers';
import videoResolvers from './video.resolvers';
import courseResolvers from './course.resolvers'
import translationResolver from './translation.resolvers';
import rootContentResolvers from './content.resolvers'
import countryResolvers from './country.resolvers'
import languageResolvers from './language.resolvers'
import questionResolvers from './question.resolvers'
import updatesResolvers from './somaUpdates.resolver'
import dashboardUser from './dashboard/dashboard.user.resolvers'
import { GraphQLDateTime } from 'graphql-iso-date';


export default [
  
  userResolvers,
  musicResolvers,
  videoResolvers,
  courseResolvers,
  translationResolver,
  rootContentResolvers,
  countryResolvers,
  languageResolvers,
  questionResolvers,
  updatesResolvers,
  dashboardUser
];
