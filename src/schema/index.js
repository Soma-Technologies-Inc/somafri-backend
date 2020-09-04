import { gql } from 'apollo-server-express';

import userSchema from './user.schema';
import AudioSchema from './audio.schema';
import videoSchema from './video.schema';
import courseSchema from './course.schema';
import TranslationSchema from './translation.schema';
import contentSchema from './content.schema'
export default [userSchema,AudioSchema,videoSchema,courseSchema, TranslationSchema,contentSchema];
