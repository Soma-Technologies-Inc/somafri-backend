import Sequelize from 'sequelize';
import db from '../database/models';
import Queries from './Queries';

const {
  Op, where, cast, col,
} = Sequelize;

class RootContentServices {
  static async CreateContent(data) {
    return Queries.create(db.rootContent, data);
  }

  static async getContents() {
    try {
      const searchContents = await db.rootContent.findAndCountAll({
        attributes: [
          'id',
          'rootCourseId',
          'chapter',
          'content',
          'contentImage',
          'contentAudio',
        ],
        order: [['id', 'DESC']],
      });
      if (!searchContents) return null;
      return searchContents;
    } catch (error) {
      return undefined;
    }
  }

  static async findContentExistence(rootCourseId, content) {
    try {
      return await db.rootContent.findOne({
        where: {
          [Op.and]: [{ content }, { rootCourseId }],
        },
      });
    } catch (error) {
      return null;
    }
  }

  static async findContentByField(limit, offset, key, value) {
    try {
      return await db.rootContent.findAll({
        attributes: [
          'id',
          'rootCourseId',
          'chapter',
          'content',
          'contentImage',
          'contentAudio',
        ],
        order: [['id', 'ASC']],
        where: { [key]: `${value}` },
        limit,
        offset,
      });
    } catch (error) {
      return null;
    }
  }
  static async findContentsByField(limit, offset, key, value) {
    try {
      return await db.rootContent.findAndCountAll({
        attributes: [
          'id',
          'rootCourseId',
          'chapter',
          'content',
          'contentImage',
          'contentAudio',
        ],
        order: [['id', 'ASC']],
        where: { [key]: `${value}` },
        limit,
        offset,
      });
    } catch (error) {
      return null;
    }
  }

  static async findContentFields(key, value) {
    try {
      return await db.rootContent.findAndCountAll({
        attributes: [
          'id',
          'rootCourseId',
          'chapter',
          'content',
          'contentImage',
          'contentAudio',
        ],
        order: [['chapter', 'ASC']],
        where: { [key]: `${value}` },
      });
    } catch (error) {
      return null;
    }
  }

  static async updateContent(
    id, contentData,
  ) {
    try {
      return await db.rootContent.update(
        contentData,
        { where: { id } },
      );
    } catch (error) {
      return null;
    }
  }

  static async searchContent(content) {
    try {
      return await db.rootContent.findAll({
        where: {
          content: {
            [Op.iLike]: `%${content}%`,
          },
        },
      });
    } catch (error) {
      return null;
    }
  }

  static async deleteContent(id) {
    try {
      return await db.rootContent.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      return null;
    }
  }
}
export default RootContentServices;
