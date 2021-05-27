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
    db.all(countSql, [catId], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }

        totalCount = rows[0]["COUNT(*)"];

        const sql =
            "SELECT novels.* FROM `novels` INNER JOIN `category_novel` on `novels`.`id` = `category_novel`.`novelId` INNER JOIN `categories` on `category_novel`.`categoryId` = `categories`.`id` WHERE `category_novel`.`categoryId` = ? ORDER BY updatedAt DESC LIMIT " +
            `${offset}, ${limit}`;

        db.all(sql, [catId], (err1, rows1) => {
            if (err1) {
                console.log(err1);
                return res.status(400).json({ error: err1.message });
            }

            return res.status(200).json(rows1);
        });
    });
});

export default router;
