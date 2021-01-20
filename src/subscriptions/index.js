import { PubSub } from 'apollo-server';

import * as USERS_EVENTS from './user';

export const EVENTS = {
	USER: USERS_EVENTS,
};

export default new PubSub();
