"use strict";
import dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import cors from 'cors'
import { connectDB } from "./atlas/mongo.js"
import { Note } from "./atlas/models/Note.js"
import { notFound } from "./atlas/middlewares/notFound.js"
import { handleErrors } from "./atlas/middlewares/handleErrors.js"

const app = express();
app.use(cors());
app.use(express.json());
// app.use(static("/mongodb"))

connectDB()

app.get("/", (req, res) => {
    res.send("<h1>Hola a todos<h1>")
})

app.get("/api/notes", (req, res) => {
    Note.find({})
        .then(notes => {
            res.json(notes)
        }).catch(error => {
            console.error(`Error al obtener las notas: ${error}`);
            res.status(500).json({ error: "Error al obtener las notas" });
        });
})

// Next se utiliza para dirigirse a la siguiente ruta que coincide con el path, solo se utiliza si no hay respuesta por eso es interesante utilizalo en los .catch.
app.get("/api/notes/:id", (req, res, next) => {
    const { id } = req.params
    Note.findById(id)
        .then(note => {
            if (note) return res.json(note)
            res.status(404).end()
        }).catch(err => next(err))
})
// Puedes hacer next y pasara al siguiente controlador, pero sim pasas next con un error va diorectamente al Midelware que este manejando el error.
app.put('/api/notes/:id', (req, res, next) => {
    const { id } = req.params
    const note = req.body
    const newNoteInfo = {
        content: note.content,
        important: note.important
    }
    Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
        .then(result => {
            res.json(result)
        }).catch(err => next(err))
})

app.delete('/api/notes/:id', (req, res, next) => {
    const { id } = req.params
    Note.findByIdAndDelete(id)
        .then(() => { res.status(204).end() })
        .catch(err => next(err))
})

app.post("/api/notes", (req, res, next) => {
    const note = req.body
    if (!note.content) {
        return res.status(400).json({
            error: `required "content" failed is missing`
        })
    }
    const newNote = new Note({
        content: note.content,
        date: new Date(),
        important: note.important || false
    })
    newNote.save().then(savedNote => {
        res.json(savedNote)
    }).catch(err => next(err))
})

// MidelWares
app.use(notFound)
app.use(handleErrors)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});