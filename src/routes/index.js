import express from "express";

const apiPrefix = "/api/v1";

const router = express.Router();

router.get(apiPrefix, (req, res) => res.json("test"));

export default router;
