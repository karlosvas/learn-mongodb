"use strict";
import password from "./password.js"
import mongoose from "mongoose";
// import { Note } from "./models/Note.js"

export const connectDB = (() => {
    const connectString = `mongodb+srv://karlosvas:${password}@clusterw.koiqqr0.mongodb.net/?retryWrites=true&w=majority`

    mongoose.connect(connectString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log("Database conected")
            mongoose.connection.close()
        }).catch(err => {
            console.error(`El error es ${err}`)
        })
})


// Para ver los datos creados
// Note.find({}).then(result => {
//     console.log(result)
//     mongoose.connection.close()
// })