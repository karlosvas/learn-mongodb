"use strict";
import express from 'express';
import cors from 'cors'
import { connectDB } from "./atlas/mongo.js"

const app = express();
app.use(cors());
app.use(express.json());

connectDB()


let notes = []

const generateID = () => {
    const notesIds = notes.map(n => n.id)
    const maxId = notesIds.length ? Math.max(...notesIds) : 0
    const newId = maxId + 1
    return newId

}

app.get("/", (req, res) => {
    res.send("<h1>Hola a todos<h1>")
})

app.get("/api/notes", (req, res) => {
    notes({ find }).then(notes => {
        response.json(notes)
    })
})

app.get("/api/notes:id", (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)

    if (note) {
        return res.json(note)
    } else {

    }
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});