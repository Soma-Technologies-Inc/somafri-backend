import { check } from 'express-validator';

class Validate {
	static signup() {
		return [
			check('firstName', 'First name should be valid.')
				.isString()
				.isLength({ min: 3 }),
			check('lastName', 'Last name should be valid.')
				.isString()
				.isLength({ min: 3 }),
			check(
				'email',
				'Invalid email address, example: example@gmail.com.',
			).isEmail(),
			check(
				'password',
				'Password should be provided and must be alphanumeric with atleast 8 charactors.',
			).isLength({ min: 8 }),
			check(
				'primaryLanguageId',
				'primaryLanguageId should be valide',
			).isNumeric(),
		];
	}

	static signin() {
		return [
			check(
				'email',
				'Invalid email address, example: example@gmail.com.',
			).isEmail(),
			check(
				'password',
				'Invalid password, your password should be alphanumeric with atleast 8 charactors.',
			).isLength({ min: 8 }),
		];
	}

	static userEmail() {
		return [
			check(
				'email',
				'Invalid email address, example: example@gmail.com.',
			).isEmail(),
		];
	}

	static userRole() {
		return [
			check(
				'role',
				'Invalid User Role.',
			).isString().isLength({ min: 2 }),
		];
	}

	static contact() {
		return [
			check('name', 'name should be valid.').isString().isLength({ min: 2 }),
			check(
				'email',
				'Invalid email address, example: example@gmail.com.',
			).isEmail(),
			check('message', 'message must be provided.')
				.isString()
				.isLength({ min: 3 }),
		];
	}

	static country() {
		return [
			check('name', 'name should be valid.').isString().isLength({ min: 3 }),
		];
	}

	static language() {
		return [
			check('name', 'name should be valid.').isString().isLength({ min: 3 }),
			check('country', 'Invalid countryId').isString().isLength({ min: 3 }),
		];
	}

	static course() {
		return [
			check('name', 'name should be valid.').isString().isLength({ min: 3 }),
			check('levelId', 'Please insert a valid levelId').isNumeric(),
		];
	}

	static rootContent() {
		return [
			check('rootCourseId', 'Invalid rootCourseId').isNumeric(),
			check('chapter', 'chapter must be a valid chapter number').isNumeric(),
			check('content', 'content must be provided').isLength({ min: 1 }),

		];
	}

	static content() {
		return [
			check('content', 'content is required').isLength({ min: 1 }),
			check('rootContentId', 'rootContentId is required').isNumeric(),
		];
	}

	static music() {
		return [
			check('music', 'music link is required').isLength({ min: 1 }),
		];
	}

	static video() {
		return [
			check('video', 'video link is required').isLength({ min: 1 }),
		];
	}

	static dailyWord() {
		return [
			check('text', 'Notification text is required').isLength({ min: 1 }),
		];
	}

	static getDailyWord() {
		return [
			check('languageKey', 'languageKey is required').isLength({ min: 1 }),
		];
	}
}

export default Validate;
