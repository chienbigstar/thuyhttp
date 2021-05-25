import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

(async () => {
    export const db = await open({
      filename: '../db/novel.db',
      driver: sqlite3.cached.Database
    })
})()
