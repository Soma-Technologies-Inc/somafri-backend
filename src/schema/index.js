import { gql } from 'apollo-server-express';

import userSchema from './user.schema';
import AudioSchema from './audio.schema';
import videoSchema from './video.schema';
import TranslationSchema from './translation.schema';
export default [userSchema,AudioSchema,videoSchema,TranslationSchema];
