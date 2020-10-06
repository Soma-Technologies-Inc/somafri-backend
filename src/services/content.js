import Sequelize from 'sequelize';
import db from '../database/models';
import Queries from './Queries';

const {
  Op, where, cast, col,
} = Sequelize;

class ContentServices {
  static async CreateContent(data) {
    return Queries.create(db.content, data);
  }

  static async getContents() {
    try {
      const searchContents = await db.content.findAndCountAll({
        attributes: [
          'id',
          'rootContentId',
          'languageId',
          'content',
          'contentAudio',
        ],
        order: [['createdAt', 'DESC']],
      });
      if (!searchContents) return null;
      return searchContents;
    } catch (error) {
      return undefined;
    }
  }

  static async findContentExistence(rootContentId, content) {
    try {
      return await db.content.findOne({
        where: {
          [Op.and]: [{ content }, { rootContentId }],
        },
      });
    } catch (error) {
      return null;
    }
  }

  static async findContentById(id) {
    try {
      return await db.content.findOne({
        where: { id },
      });
    } catch (error) {
      return null;
    }
  }

  static async deleteContent(id) {
    try {
      return await db.content.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      return null;
    }
  }

  static async findContentByRootId(rootContentId) {
    try {
      return await db.content.findOne({
        attributes: [
          'id',
          'rootContentId',
          'languageId',
          'content',
          'contentAudio',
        ],
        where: { rootContentId },
      });
    } catch (error) {
      return null;
    }
  }

  static async findContentByRootIdAndByLanguage(rootContentId, languageId) {
    try {
      return await db.content.findOne({
        attributes: [
          'id',
          'rootContentId',
          'languageId',
          'content',
          'contentAudio',
        ],
        where: {
          [Op.and]: [{ rootContentId }, { languageId }],
        },
        order: [['rootContentId', 'ASC']],
      });
    } catch (error) {
      return null;
    }
  }

  static async findAllContentByRootId(rootContentId) {
    try {
      return await db.content.findAndCountAll({
        attributes: [
          'id',
          'rootContentId',
          'languageId',
          'content',
          'contentAudio',
        ],
        where: { rootContentId },
      });
    } catch (error) {
      return null;
    }
  }

  static async findAllrootContentChapterByRootCourseId(limit, offset, rootCourseId) {
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
        where: { rootCourseId },
        limit,
        offset,
      });
    } catch (error) {
      return null;
    }
  }

  static async findContentByField(limit, offset, key, value) {
    try {
      return await db.content.findAndCountAll({
        attributes: [
          'id',
          'rootContentId',
          'languageId',
          'content',
          'contentAudio',
        ],
        include: [{
          model: db.rootContent,
          attributes: ['chapter'],
        }],
        order: [['rootContentId', 'ASC']],
        where: { [key]: `${value}` },
        limit,
        offset,
      });
    } catch (error) {
      return null;
    }
  }

  static async findRootContents(rootCourseId) {
    try {
      return await db.rootContent.findAll({
        where: { rootCourseId },
      });
    } catch (error) {
      return null;
    }
  }

  static async updateContent(
    id, contentData,
  ) {
    try {
      return await db.content.update(
        contentData,
        { where: { id } },
      );
    } catch (error) {
      return null;
    }
  }

  static async searchContent(content) {
    try {
      return await db.content.findAll({
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

  static async getRootContents() {
    try {
      const rootContents= await db.rootContent.findAll();
      return rootContents;
    } catch (error) {
      return error;
    }
  }

  static async createContents(data) {
    return Queries.create(db.content, data);
  }
}
export default ContentServices;
