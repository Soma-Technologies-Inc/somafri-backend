import CoursesServices from '../services/courses';

import response from './response';

class CoursesHelper {
	static async getCoursesByLevel(rootCourseId) {
		const courseName = await CoursesServices.getCourseName(rootCourseId);
		return courseName;
	}
}
export default CoursesHelper;
