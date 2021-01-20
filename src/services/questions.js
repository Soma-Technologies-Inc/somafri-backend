import { emit } from 'nodemon';
import db from '../database/models';
import Queries from './Queries';
import response from '../helpers/response';

class QuestionServices {
	static async CreateRootQuestion(data) {
		return Queries.create(db.rootQuestion, data);
	}

	static async CreateQuestion(data) {
		return Queries.create(db.question, data);
	}

	static async checkIfRootCourseExist(rootCourseId) {
		return Queries.checkIfRootCourseExist(db.rootCourse, rootCourseId);
	}

	static async checkIfRootQuestionExist(rootQuestionId) {
		return Queries.checkIfRootQuestionExist(db.rootQuestion, rootQuestionId);
	}

	static async getRootQuestion(rootCourseId) {
		return Queries.getRootQuestion(db.rootQuestion, rootCourseId);
	}

	static async getQuestion(questionId) {
		return Queries.getQuestion(db.question, questionId);
	}

	static async findTestParts(primaryLanguageId) {
		return Queries.findTestParts(db.question, primaryLanguageId);
	}

	static async findContents(rootContentId, primaryLanguageId) {
		return Queries.findContents(db.content, rootContentId, primaryLanguageId);
	}

	static async findContentsQuestion(rootContentId) {
		return Queries.findContentsQuestion(db.content, rootContentId);
	}
}
export default QuestionServices;
