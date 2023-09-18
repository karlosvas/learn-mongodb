import express from "express"
// => EN el caso de no encontarr un end point muestra un erro 404.
const app = express()
export const notFound = app.use((req, res, next) => {
    res.status(404).end()
})