import express from 'express'
import {createNote as addNoteInDB} from '../db/notes'
import CustomResponse from '../helpers/CustomResponse'
export const createNote = async (req: express.Request, res: CustomResponse, next: express.NextFunction) => {
    try {
        const {name, category, content} = req.body
        const noteData = {
            name,
            category,
            content: content ? content : ''
        }
        res.data = await addNoteInDB(noteData)
        res.status(201)
    } catch (error) {
        res.error = error
        res.status(400);
    } finally {
        next()
    }
}