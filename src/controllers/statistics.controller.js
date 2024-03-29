/* eslint-disable no-await-in-loop */
/* eslint-disable no-inner-declarations */
import response from '../helpers/response';
import UserServices from '../services/users';
import LanguageServices from '../services/language';

class statisticsController {
	static async getMonthlyUsers(req, res) {
		try {
			const somaUsers = await UserServices.countUsers();
			const firstUser = somaUsers.rows[0];
			const lastUser = somaUsers.rows[somaUsers.count - 1];

			const firstUserYear = firstUser.createdAt.getFullYear();
			const firstUserMonth = firstUser.createdAt.getMonth() + 1;

			const lastUserYear = lastUser.createdAt.getFullYear();
			const lastUserMonth = lastUser.createdAt.getMonth() + 1;

			const monthUsers = [];
			async function asyncCall() {
				for (let i = firstUserYear; i <= lastUserYear; i += 1) {
					if (i === firstUserYear) {
						for (let j = firstUserMonth; j <= 12; j += 1) {
							const users = await UserServices.monthlyUsers(firstUserYear, j);
							monthUsers.push({
								period: `${firstUserYear}-${j < 10 ? `0${j}` : j}`,
								totalUsers: users.length,
								users,
							});
						}
					} else if (i === lastUserYear) {
						for (let k = 1; k <= lastUserMonth; k += 1) {
							const users = await UserServices.monthlyUsers(lastUserYear, k);
							monthUsers.push({
								period: `${lastUserYear}-${k < 10 ? `0${k}` : k}`,
								totalUsers: users.length,
								users,
							});
						}
					} else {
						for (let l = 1; l <= 12; l += 1) {
							const users = await UserServices.monthlyUsers(i, l);
							monthUsers.push({
								period: `${i}-${l < 10 ? `0${l}` : l}`,
								totalUsers: users.length,
								users,
							});
						}
					}
				}
				return monthUsers;
			}
			const somaMonthlyUsers = await asyncCall();
			return response.successMessage(
				res,
				'Monthly users',
				200,
				somaMonthlyUsers
			);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async getStatisticsDate(req, res) {
		try {
			const somaUsers = await UserServices.countUsers();
			const firstUser = somaUsers.rows[0];
			const lastUser = somaUsers.rows[somaUsers.count - 1];

			const firstUserYear = firstUser.createdAt.getFullYear();
			const firstUserMonth = firstUser.createdAt.getMonth() + 1;

			const lastUserYear = lastUser.createdAt.getFullYear();
			const lastUserMonth = lastUser.createdAt.getMonth() + 1;

			const somaEnrollments = await LanguageServices.findEnrollments();

			const firstEnrollment = somaEnrollments[0];
			const lastEnrollment = somaEnrollments[somaEnrollments.length - 1];

			const firstEnrollmentYear = firstEnrollment.createdAt.getFullYear();
			const firstEnrollmentMonth = firstEnrollment.createdAt.getMonth() + 1;

			const lastEnrollmentYear = lastEnrollment.createdAt.getFullYear();
			const lastEnrollmentMonth = lastEnrollment.createdAt.getMonth() + 1;

			const data = {
				firstUserYear,
				firstUserMonth,
				lastUserYear,
				lastUserMonth,
				firstEnrollmentYear,
				firstEnrollmentMonth,
				lastEnrollmentYear,
				lastEnrollmentMonth
			};
			return response.successMessage(
				res,
				'statistics dates',
				200,
				data
			);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async getAnnualUsers(req, res) {
		try {
			const { year } = req.params;

			const somaUsers = await UserServices.countUsers();
			const firstUser = somaUsers.rows[0];
			const lastUser = somaUsers.rows[somaUsers.count - 1];

			const firstUserYear = firstUser.createdAt.getFullYear();
			const firstUserMonth = firstUser.createdAt.getMonth() + 1;

			const lastUserYear = lastUser.createdAt.getFullYear();
			const lastUserMonth = lastUser.createdAt.getMonth() + 1;

			if (year < firstUserYear) {
				return response.errorMessage(res, 'no users found in the entered  year and the bellow year', 404);
			} if (year > lastUserYear) {
				return response.errorMessage(res, 'no users found in the entered year and the above year', 404);
			}
			const monthUsers = [];
			async function asyncCall() {
				if (parseInt(year, 10) === firstUserYear) {
					for (let j = firstUserMonth; j <= 12; j += 1) {
						const users = await UserServices.monthlyUsers(firstUserYear, j);
						monthUsers.push({
							period: `${firstUserYear}-${j < 10 ? `0${j}` : j}`,
							totalUsers: users.length,
							users,
						});
					}
				} else if (parseInt(year, 10) === lastUserYear) {
					for (let k = 1; k <= lastUserMonth; k += 1) {
						const users = await UserServices.monthlyUsers(lastUserYear, k);
						monthUsers.push({
							period: `${lastUserYear}-${k < 10 ? `0${k}` : k}`,
							totalUsers: users.length,
							users,
						});
					}
				} else {
					for (let l = 1; l <= 12; l += 1) {
						const users = await UserServices.monthlyUsers(year, l);
						monthUsers.push({
							period: `${year}-${l < 10 ? `0${l}` : l}`,
							totalUsers: users.length,
							users,
						});
					}
				}
				return monthUsers;
			}
			const somaMonthlyUsers = await asyncCall();
			return response.successMessage(
				res,
				'Monthly users',
				200,
				somaMonthlyUsers
			);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async getYearsUsers(req, res) {
		try {
			const somaUsers = await UserServices.countUsers();
			const firstUser = somaUsers.rows[0];
			const lastUser = somaUsers.rows[somaUsers.count - 1];

			const firstUserYear = firstUser.createdAt.getFullYear();
			const lastUserYear = lastUser.createdAt.getFullYear();

			const yearsUsers = [];
			async function asyncCall() {
				for (let i = firstUserYear; i <= lastUserYear; i += 1) {
					const users = await UserServices.yearUsers(i);
					yearsUsers.push({
						year: i,
						totalUsers: users.count
					});
				}
				return yearsUsers;
			}
			const somaYearsUsers = await asyncCall();
			return response.successMessage(
				res,
				'Soma Different Years users',
				200,
				somaYearsUsers
			);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async getYearsEnrollments(req, res) {
		try {
			const somaEnrollments = await LanguageServices.findEnrollments();
			const firstEnrollment = somaEnrollments[0];
			const lastEnrollment = somaEnrollments[somaEnrollments.length - 1];

			const firstEnrollmentYear = firstEnrollment.createdAt.getFullYear();
			const lastEnrollmentYear = lastEnrollment.createdAt.getFullYear();

			const yearsEnrollments = [];
			async function asyncCall() {
				for (let i = firstEnrollmentYear; i <= lastEnrollmentYear; i += 1) {
					const enrollments = await LanguageServices.yearEnrollments(i);
					yearsEnrollments.push({
						year: i,
						totalEnrollments: enrollments.count
					});
				}
				return yearsEnrollments;
			}
			const somaYearsEnrollments = await asyncCall();
			return response.successMessage(
				res,
				'Soma Different Years Enrollments',
				200,
				somaYearsEnrollments
			);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async getMonthlyEnrollment(req, res) {
		try {
			const somaEnrollments = await LanguageServices.findEnrollments();

			const firstEnrollment = somaEnrollments[0];
			const lastEnrollment = somaEnrollments[somaEnrollments.length - 1];

			const firstEnrollmentYear = firstEnrollment.createdAt.getFullYear();
			const firstEnrollmentMonth = firstEnrollment.createdAt.getMonth() + 1;

			const lastEnrollmentYear = lastEnrollment.createdAt.getFullYear();
			const lastEnrollmentMonth = lastEnrollment.createdAt.getMonth() + 1;

			const monthEnrollments = [];
			async function asyncCall() {
				for (let i = firstEnrollmentYear; i <= lastEnrollmentYear; i += 1) {
					if (i === firstEnrollmentYear) {
						for (let j = firstEnrollmentMonth; j <= 12; j += 1) {
							const enrollments = await LanguageServices.monthlyEnrollments(
								firstEnrollmentYear,
								j
							);
							monthEnrollments.push({
								period: `${firstEnrollmentYear}-${j < 10 ? `0${j}` : j}`,
								totalEnrollments: enrollments.length,
								enrollments,
							});
						}
					} else if (i === lastEnrollmentYear) {
						for (let k = 1; k <= lastEnrollmentMonth; k += 1) {
							const enrollments = await LanguageServices.monthlyEnrollments(
								lastEnrollmentYear,
								k
							);
							monthEnrollments.push({
								period: `${lastEnrollmentYear}-${k < 10 ? `0${k}` : k}`,
								totalEnrollments: enrollments.length,
								enrollments,
							});
						}
					} else {
						for (let l = 1; l <= 12; l += 1) {
							const enrollments = await LanguageServices.monthlyEnrollments(
								i,
								l
							);
							monthEnrollments.push({
								period: `${i}-${l < 10 ? `0${l}` : l}`,
								totalEnrollments: enrollments.length,
								enrollments,
							});
						}
					}
				}
				return monthEnrollments;
			}
			const somaMonthlyEnrollments = await asyncCall();
			return response.successMessage(
				res,
				'Monthly Enrollments',
				200,
				somaMonthlyEnrollments
			);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}

	static async getAnnualEnrollments(req, res) {
		try {
			const { year } = req.params;

			const somaEnrollments = await LanguageServices.findEnrollments();

			const firstEnrollment = somaEnrollments[0];
			const lastEnrollment = somaEnrollments[somaEnrollments.length - 1];

			const firstEnrollmentYear = firstEnrollment.createdAt.getFullYear();
			const firstEnrollmentMonth = firstEnrollment.createdAt.getMonth() + 1;

			const lastEnrollmentYear = lastEnrollment.createdAt.getFullYear();
			const lastEnrollmentMonth = lastEnrollment.createdAt.getMonth() + 1;

			if (year < firstEnrollmentYear) {
				return response.errorMessage(res, 'no Enrollments found in the entered  year and the bellow year', 404);
			} if (year > lastEnrollmentYear) {
				return response.errorMessage(res, 'no Enrollments found in the entered year and the above year', 404);
			}
			const monthEnrollments = [];
			async function asyncCall() {
				if (parseInt(year, 10) === firstEnrollmentYear) {
					for (let j = firstEnrollmentMonth; j <= 12; j += 1) {
						const enrollments = await LanguageServices.monthlyEnrollments(
							firstEnrollmentYear,
							j
						);
						monthEnrollments.push({
							period: `${firstEnrollmentYear}-${j < 10 ? `0${j}` : j}`,
							totalEnrollments: enrollments.length,
							enrollments,
						});
					}
				} else if (parseInt(year, 10) === lastEnrollmentYear) {
					for (let k = 1; k <= lastEnrollmentMonth; k += 1) {
						const enrollments = await LanguageServices.monthlyEnrollments(
							lastEnrollmentYear,
							k
						);
						monthEnrollments.push({
							period: `${lastEnrollmentYear}-${k < 10 ? `0${k}` : k}`,
							totalEnrollments: enrollments.length,
							enrollments,
						});
					}
				} else {
					for (let l = 1; l <= 12; l += 1) {
						const enrollments = await LanguageServices.monthlyEnrollments(
							year,
							l
						);
						monthEnrollments.push({
							period: `${year}-${l < 10 ? `0${l}` : l}`,
							totalEnrollments: enrollments.length,
							enrollments,
						});
					}
				}
				return monthEnrollments;
			}
			const somaMonthlyUsers = await asyncCall();
			return response.successMessage(
				res,
				'Monthly users',
				200,
				somaMonthlyUsers
			);
		} catch (e) {
			return response.errorMessage(res, e.message, 500);
		}
	}
}

export default statisticsController;
