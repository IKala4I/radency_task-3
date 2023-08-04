import express from 'express'
import {createNote as addNoteInDB, deleteNoteById, getNoteById, getNotes, updateNoteById} from '../db/notes'
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

export const getAllNotes = async (req: express.Request, res: CustomResponse, next: express.NextFunction) => {
    try {
        res.data = await getNotes()
        res.status(200)
    } catch (error) {
        res.error = error
        res.status(404)
    } finally {
        next()
    }
}

export const deleteNote = async (req: express.Request, res: CustomResponse, next: express.NextFunction) => {
    try {
        const {id} = req.params
        res.data = await deleteNoteById(id)
    } catch (error) {
        res.error = error
        res.status(400)
    } finally {
        next()
    }
}

export const getNote = async (req: express.Request, res: CustomResponse, next: express.NextFunction) => {
    try {
        const {id} = req.params
        res.data = await getNoteById(id)
    } catch (error) {
        res.error = error
        res.status(400)
    } finally {
        next()
    }
}

export const updateNote = async (req: express.Request, res: CustomResponse, next: express.NextFunction) => {
    try {
        const {id} = req.params
        res.data = await updateNoteById(id, res.data)
    } catch (error) {
        res.error = error
        res.status(400)
    } finally {
        next()
    }
}