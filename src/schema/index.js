import { gql } from 'apollo-server-express';

import userSchema from './user.schema';
import AudioSchema from './audio.schema';
import videoSchema from './video.schema';
import courseSchema from './course.schema';
import TranslationSchema from './translation.schema';
import contentSchema from './content.schema';
import countrySchema from './country.schema';
import languageSchema from './language.schema';
import questionSchema from './question.schema';
import somaUpdates from './somaUpdates.schema';
import dashboardUser from './dashboard/dashboard.user';

export default [
	userSchema,
	AudioSchema,
	videoSchema,
	courseSchema,
	TranslationSchema,
	contentSchema,
	countrySchema,
	languageSchema,
	questionSchema,
	somaUpdates,
	dashboardUser,
];
