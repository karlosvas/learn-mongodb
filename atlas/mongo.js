"use strict";
import mongoose from "mongoose";
// import { Note } from "./models/Note.js"

export const connectDB = (() => {
    const connectString = process.env.MONGO_DB_URI

    mongoose.connect(connectString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log("Database conected")
        }).catch(err => {
            console.error(`El error es ${err}`)
        })
})


// Para ver los datos creados
// Note.find({}).then(result => {
//     console.log(result)
//     mongoose.connection.close()
// })