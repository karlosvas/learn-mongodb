"use strict"
import mongoose, { Schema, model } from "mongoose";

const noteSchema = new Schema({
    id: String,
    title: String,
    content: String,
    imagePath: String,
    price: Number
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})
export const Note = model('Note', noteSchema)


// Con este código podremos agregar datos.
// const note = new Note({
//     id: "mistborn1",
//     title: "El imperio final",
//     content: "El imperio final inicia la saga «Nacidos de la Bruma [Mistborn]»,obra imprescindible del Cosmere, el universo destinado a dar forma a la serie más extensa y fascinante jamás escrita en el ámbito de la fantasía épica. Del autor best seller del New York Times.",
//     imagePath: "/img/mistborn1.png",
//     price: 18.49
// })

// note.save()
//     .then(result => {
//         console.log(result)
//         mongoose.connection.close()
//     }).catch(err => {
//         console.error(err)
//     })
