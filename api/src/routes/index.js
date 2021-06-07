import express from 'express';
import { Op } from 'sequelize';
import { Book, Category, Chapter } from '../models';

const apiPrefix = '/api/v1';

const router = express.Router();

router.get(apiPrefix, (req, res) => res.json('test'));

router.get(`${apiPrefix}/categories`, async (req, res) => {
  try {
    const cates = await Category.findAll({
      order: [['updatedAt', 'DESC']],
    });

    return res.status(200).json({
      results: cates,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.get(`${apiPrefix}/book-by-catId/:catId`, async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  const catId = parseInt(req.params.catId);

  try {
    const booksCount = await Book.count({
      include: [
        {
          model: Category,
          where: {
            id: catId,
          },
        },
      ],
    });

    const books = await Book.findAll({
      include: [
        {
          model: Category,
          where: {
            id: catId,
          },
        },
      ],
      limit: limit,
      offset: offset,
    });

    return res.status(200).json({
      results: books,
      totalCount: booksCount,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.get(`${apiPrefix}/newest-book`, async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  try {
    const books = await Book.findAll({
      order: [['updatedAt', 'DESC']],
      limit: limit,
      offset: offset,
    });

    return res.status(200).json({
      results: books,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.get(`${apiPrefix}/chapter-by-bookId/:bookId`, async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  const bookId = parseInt(req.params.bookId);

  try {
    const chaptersCount = await Chapter.count({
      where: { bookId: bookId },
    });

    const chapters = await Chapter.findAll({
      where: { bookId: bookId },
      attributes: ['id', 'title', 'image', 'chapterNumber'],
      order: [['chapterNumber', 'ASC']],
      limit: limit,
      offset: offset,
    });

    return res.status(200).json({
      results: chapters,
      totalCount: chaptersCount,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.get(`${apiPrefix}/chapter/:chapterId`, async (req, res) => {
  const chapterId = parseInt(req.params.chapterId);

  try {
    const chapter = await Chapter.findByPk(chapterId);

    if (!chapter) {
      return res.status(400).json({ error: 'Not found' });
    }

    return res.status(200).json(chapter);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.get(`${apiPrefix}/book-search-by-name`, async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  const search = req.query.search || '';
  const searchValue = `%${search}%`;

  try {
    const booksCount = await Book.count({
      where: {
        name: {
          [Op.like]: searchValue,
        },
      },
    });

    const books = await Book.findAll({
      where: {
        name: {
          [Op.like]: searchValue,
        },
      },
      limit: limit,
      offset: offset,
      order: [['updatedAt', 'DESC']],
    });

    return res.status(200).json({
      results: books,
      totalCount: booksCount,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default router;
