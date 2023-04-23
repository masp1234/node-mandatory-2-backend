import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export default await open({
    filename: './mandatory_2.sqlite',
    driver: sqlite3.Database
})