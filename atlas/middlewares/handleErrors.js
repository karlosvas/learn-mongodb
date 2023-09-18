"use strict"
import express from "express"
// Middleware, todos los sitios donde tenemos este id pasara por aqui.
const app = express()
export const handleErrors = app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.name)
    if (err.name == "CastError") {
        res.status(400).end()
    } else {
        res.status(500).end()
    }
})