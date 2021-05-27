import sqlite3 from "sqlite3";
import path from "path";

const dbPath = path.resolve(__dirname, "../db/novel.db");

export const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.log(err.message);
        throw err;
    } else {
        console.log("conected to db");
    }
});
