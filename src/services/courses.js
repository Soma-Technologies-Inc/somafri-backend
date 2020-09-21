import Sequelize from 'sequelize';
import db from '../database/models';
import Queries from './Queries';

const { Op } = Sequelize;

class CoursesServices {
  static async getCourses(languageId) {
    try {
      const searchCourse = await db.course.findAndCountAll({
        where: {
          languageId,
        },
        attributes: ['id', 'name', 'rootCourseId'],
        include: [{
          model: db.rootCourse,
          attributes: ['name', 'courseIcon'], 
        }],
        order: [['createdAt', 'ASC']],
      });
      if (!searchCourse) return null;
      return searchCourse;
    } catch (error) {
      return undefined;
    }
  }

  static async getCoursesByLanguage(languageId, id) {
    try {
      return await db.course.findOne({
        where: {
          [Op.and]: [{ id }, { languageId }],
        },
      });
    } catch (error) {
      return null;
    }
  }

  static getCoursesByLanguageAndRoot(languageId, rootCourseId) {
    try {
      const course = db.course.findOne({
        where: {
          [Op.and]: [{ rootCourseId }, { languageId }],
        },
        order: [['id', 'ASC']],
        attributes: ['id', 'name', 'rootCourseId'],
      });
      if (!course) return null;
      return course;
    } catch (error) {
      return null;
    }
  }

  static async findCourseByField(key, value) {
    try {
      return await db.course.findAll({
        where: { [key]: `${value}` },
        include: [{
          model: db.rootCourse,
          as: 'rootCourse',
          attributes: ['levelId', 'courseIcon', 'complexity', 'name'],
        }],
        order: [
          ['rootCourseId', 'ASC'],
          ['rootCourse', 'levelId', 'ASC'],
          ['rootCourse', 'complexity', 'ASC'],
        ],
      });
    } catch (error) {
      return null;
    }
  }

  static async getCourse(id) {
    try {
      const course = await db.course.findOne({ where: { id } });
      if (!course) return null;
      return course;
    } catch (error) {
      return undefined;
    }
  }

  static async getCoursesByLevel(levelId) {
    try {
      const searchCourse = await db.rootCourse.findAndCountAll({
        where: {
          levelId,
        },
        attributes: ['id', 'name', 'courseIcon'],
        order: [['createdAt', 'DESC']],
      });
      if (!searchCourse) return null;
      return searchCourse;
    } catch (error) {
      return undefined;
    }
  }

  static async findRootCoursesByField(limit, offset, key, value) {
    try {
      return await db.rootCourse.findAndCountAll({
        where: { [key]: `${value}` },
        order: [['complexity', 'ASC']],
        limit,
        offset,
      });
    } catch (error) {
      return null;
    }
  }

  static async getRootCoursesByField(key, value) {
    try {
      return await db.rootCourse.findAndCountAll({
        where: { [key]: `${value}` },
        order: [['complexity', 'ASC']],
      });
    } catch (error) {
      return null;
    }
  }

  static async findCoursesBy2Field(limit, offset, key, value, key2, value2) {
    try {
      return await db.course.findAndCountAll({
        where: {
          [Op.and]: [{ [key]: `${value}` }, { [key2]: `${value2}` }],
        },
        limit,
        offset,
      });
    } catch (error) {
      return null;
    }
  }

  static async getCourseName(rootCourseId) {
    return Queries.getCourseName(db.course, rootCourseId);
  }

  static async findIfLanguageExist(languageId) {
    return Queries.findIfLanguageExist(db.language, languageId);
  }

  static async findIfLevelExist(levelId) {
    return Queries.findIfLevelExist(db.level, levelId);
  }

  static async findIfRootCourseExist(rootCourseId) {
    return Queries.findIfRootCourseExist(db.rootCourse, rootCourseId);
  }

  static async createRootCourses(data) {
    return Queries.create(db.rootCourse, data);
  }

  static async createCourses(data) {
    return Queries.create(db.course, data);
  }
}
export default CoursesServices;
