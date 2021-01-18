import CareerService from '../services/Career.Service';
import response from '../helpers/response';

class CareerController {
	static async createCareer(req, res) {
		const createdCareer = await CareerService.createCareer({
			department: req.body.department,
			jobTitle: req.body.jobTitle,
			location: req.body.location,
			jobLink: req.body.jobLink,
		});

		return response.successMessage(
			res,
			'Career is successfully created',
			201,
			createdCareer
		);
	}

	static async getOpenCareer(req, res) {
		const openCarrers = await CareerService.getCareersByAttribute({
			isOpen: true,
		});
		if (Object.keys(openCarrers).length !== 0) {
			const careersToDisplay = Object.entries(openCarrers).map(
				([key, career]) => {
					const { createdAt, updatedAt, ...careersElement } = career.dataValues;
					return careersElement;
				}
			);

			const groupedCareers = careersToDisplay.reduce((acc, obj) => {
				const key = obj.department;
				if (!acc[key]) {
					acc[key] = [];
				}
				acc[key].push(obj);
				return acc;
			}, {});
			const groupedCareersToDisplay = Object.entries(groupedCareers).map(
				([key, career]) => ({ department: key, depRoles: career })
			);
			return response.successMessage(
				res,
				'Careers retrieved successfully',
				200,
				groupedCareersToDisplay
			);
		}
		return response.errorMessage(
			res,
			'Sorry no open careers at the moments',
			404
		);
	}

  static updateCareer = async (req, res) => {
  	if (parseInt(req.params.id)) {
  		const careerExist = await CareerService.findCareerByAttribute({ id: req.params.id });
  		if (careerExist) {
  			await CareerService.updateCareerByAttribute(
  				{ id: req.params.id },
  				req.body
  			);
  			return response.successMessage(
  				res,
  				'Career updated successfully',
  				200

  			);
  		}
  		return response.errorMessage(
  			res,
  			`Career with id ${req.params.id} does not exist`,
  			404
  		);
  	}
  	return response.errorMessage(res, 'Invalid id supplied', 422);
  };
}

export default CareerController;
