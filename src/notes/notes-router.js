const path = require("path"); 
const express = require("express");
const xss = require("xss");
const NotesService = require("./notes-service");
const e = require("express");

const notesRouter = express.Router();
const jsonParser = express.json();

const serializeNote = (note) => ({
    id: note.id,
    title: xss(note.title),
    content: xss(note.content),
    date_published: note.date_published,
    folderId: note.folder_id,
});

notesRouter
    .route("/")
    .get((req, res, next) => {
        const knexInstance = req.app.get("db");
        NotesService.getAllNotes(req.app.get("db"))
        .then((notes) => {
            res.json(notes.map(serializeNote));
        })
        .catch(next);
    })
    .post(jsonParser, (req, res, next) => {
        const { title, content, folderId } = req.body;
        const newNote = { title, content, folder_id:folderId };
        console.log(newNote)
        for (const [key, value] of Object.entries(newNote)) {  
        if (value == null) {
            return res.status(400).json({
            error: { message: `Missing '${key}' in request body` },
            });
        }
        }
        NotesService.insertNote(req.app.get("db"), newNote)
        .then((note) => {
            res
            .status(201)
            .location(path.posix.join(req.originalUrl + `/${note.id}`))
            .json(serializeNote(note));
        })
        .catch((e) => {
            next(e)
            console.log(e)
        });
    })

    notesRouter
    .route("/:note_id")
    .all((req, res, next) => {
        NotesService.getById(req.app.get("db"), req.params.note_id)
        .then((note) => {
        if (!note) {
            return res.status(404).json({
            error: { message: `Note doesn't exist` },
            });
        }
        res.note = note; 
        next(); 
        })
        .catch(next);
    })
    .delete((req, res, next) => {
        NotesService.deleteNote(req.app.get("db"), req.params.note_id)
        .then(() => {
            res.status(204).end();
        })
        .catch(next);
})


module.exports = notesRouter