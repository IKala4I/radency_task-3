import express from 'express'
import {createNoteValid, updateNoteValid} from '../middlewares/users.middleware'
import {createNote, deleteNote, getAllNotes, getNote, getStats, updateNote} from '../controllers/notes'
import {responseMiddleware} from '../middlewares/response.middleware'

export default (router: express.Router) => {
    router.get('/notes', getAllNotes, responseMiddleware)
    router.get('/notes/stats/', getStats, responseMiddleware)
    router.get('/notes/:id', getNote, responseMiddleware)
    router.delete('/notes/:id', deleteNote, responseMiddleware)
    router.post('/notes', createNoteValid, createNote, responseMiddleware)
    router.patch('/notes/:id', updateNoteValid, updateNote, responseMiddleware)
}