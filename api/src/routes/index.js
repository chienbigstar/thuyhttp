import express from "express";
import { db } from "../db";

const apiPrefix = "/api/v1";

const router = express.Router();

router.get(apiPrefix, (req, res) => res.json("test"));

router.get(`${apiPrefix}/novel-by-catId/:catId`, (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const catId = parseInt(req.params.catId);

    const countSql =
        "SELECT COUNT(*) FROM `novels` INNER JOIN `category_novel` on `novels`.`id` = `category_novel`.`novelId` INNER JOIN `categories` on `category_novel`.`categoryId` = `categories`.`id` WHERE `category_novel`.`categoryId` = ?";

    let totalCount;
    db.get(countSql, [catId], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }

        totalCount = rows["COUNT(*)"];

        const sql =
            "SELECT novels.* FROM `novels` INNER JOIN `category_novel` on `novels`.`id` = `category_novel`.`novelId` INNER JOIN `categories` on `category_novel`.`categoryId` = `categories`.`id` WHERE `category_novel`.`categoryId` = ? ORDER BY updatedAt DESC LIMIT " +
            `${offset}, ${limit}`;

        db.all(sql, [catId], (err1, rows1) => {
            if (err1) {
                return res.status(400).json({ error: err1.message });
            }

            return res.status(200).json({
                results: rows1,
                totalCount: totalCount,
            });
        });
    });
});

router.get(`${apiPrefix}/newest-novel`, (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    const sql = "SELECT * FROM `novels` ORDER BY updatedAt DESC LIMIT " + `${offset}, ${limit}`;

    db.all(sql, (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        return res.status(200).json({
            results: rows,
        });
    });
});

router.get(`${apiPrefix}/chapter-by-novelId/:novelId`, (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const novelId = parseInt(req.params.novelId);

    const countSql = "SELECT COUNT(*) from `chapters` where `novelId` = ?";

    let totalCount;
    db.get(countSql, [novelId], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }

        totalCount = rows["COUNT(*)"];

        const sql =
            "SELECT `id`, `title`, `image`, `chapterNumber` from `chapters` where `novelId` = ? ORDER BY chapterNumber ASC LIMIT " +
            `${offset}, ${limit}`;

        db.all(sql, [novelId], (err1, rows1) => {
            if (err1) {
                return res.status(400).json({ error: err1.message });
            }

            return res.status(200).json({
                results: rows1,
                totalCount: totalCount,
            });
        });
    });
});

router.get(`${apiPrefix}/chapter/:chapterId`, (req, res) => {
    const chapterId = parseInt(req.params.chapterId);

    const sql = "SELECT * FROM `chapters` WHERE `id` = ? LIMIT 1";

    db.get(sql, [chapterId], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }

        return res.status(200).json(rows);
    });
});

router.get(`${apiPrefix}/novel-search-by-name`, (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const search = req.query.search || "";
    const searchValue = `%${search}%`;

    const countSql = "SELECT COUNT(*) FROM `novels` WHERE `name` LIKE ? ORDER BY updatedAt DESC";

    let totalCount;
    db.get(countSql, [searchValue], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }

        totalCount = rows["COUNT(*)"];

        const sql =
            "SELECT * FROM `novels` WHERE `name` LIKE ? ORDER BY updatedAt DESC LIMIT " +
            `${offset}, ${limit}`;

        db.all(sql, [searchValue], (err1, rows1) => {
            if (err1) {
                return res.status(400).json({ error: err1.message });
            }

            return res.status(200).json({
                results: rows1,
                totalCount: totalCount,
            });
        });
    });
});

export default router;
