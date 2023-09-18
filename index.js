"use strict";
import dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import cors from 'cors'
import { connectDB } from "./atlas/mongo.js"
import { Note } from "./atlas/models/Notes.js"
import { notFound } from "./midelwares/notFound.js"
import { handleErrors } from "./midelwares/handleErrors.js"

const app = express();
app.use(cors());
app.use(express.json());

connectDB()

app.get("/", (req, res) => {
    res.send("<h1>Hola a todos<h1>")
})

app.get("/api/notes", (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes)
    })
        .catch(error => {
            console.error(`Error al obtener las notas: ${error}`);
            res.status(500).json({ error: "Error al obtener las notas" });
        });
})

app.get("/api/notes/:id", (req, res, next) => {
    const { id } = req.params
    Note.findById(id).then(note => {
        if (note) {
            return res.json(note)
        } else {
            res.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})

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
        })
})

app.delete('/api/notes/:id', (req, res, next) => {
    const { id } = req.params
    Note.findByIdAndRemove(id).then(res => {
        res.status(204).end()
    }).catch(err => next(err))
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})

app.post("/api/notes", (req, res) => {
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
    })
})

// MidelWares
app.use(notFound)
app.use(handleErrors)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});