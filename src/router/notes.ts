import express from 'express'
import {createNoteValid} from '../middlewares/users.middleware'
import {createNote} from '../controllers/notes'
import {responseMiddleware} from '../middlewares/response.middleware'

export default (router: express.Router) => {
    // router.get('/users')
    // router.delete('/users/:id')
    // router.patch('/users/:id')
    router.post('/notes', createNoteValid, createNote, responseMiddleware)
}