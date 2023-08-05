import express from 'express'
import CustomResponse from '../helpers/CustomResponse'

export const createNoteValid = (req: express.Request, res: CustomResponse, next: express.NextFunction) => {
    const {name, category} = req.body
    try {
        if (!name || !category)
            throw new Error(`Name and category are required`)


        if (!isString(name) || !isString(category))
            throw new Error('Name and category must be string')

        if (!isCategoryType(category))
            throw new Error('The category should be: Task, Quote, Random Thought or Idea')

        res.data = {...req.body}
        next()
    } catch (error) {
        res.status(400).send(error.message)
        res.error = error
    }
}

export const updateNoteValid = async (req: express.Request, res: CustomResponse, next: express.NextFunction) => {
    const {name, category, content, archived} = req.body
    let dates = ''
    try {
        if (name || name === '')
            if (!isString(name) || name === '')
                throw new Error('Name must be non-empty string')

        if (category || category === '') {
            if (!isString(category) || category === '')
                throw new Error('Category must be string')
            if (!isCategoryType(category))
                throw new Error('The category should be: Task, Quote, Random Thought or Idea')
        }

        if (content) {
            if (!isString(content))
                throw new Error('Content must be string')
            const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g;
            dates = content.match(dateRegex)?.join(', ') || ''
        }

        if (archived)
            if (typeof archived !== 'boolean')
                throw new Error('Archived must be true or false')

        res.data = {
            ...req.body,
            ...(typeof content === 'string' ? { dates } : {}),
        }
        next()
    } catch (error) {
        res.status(400).send(error.message)
        res.error = error
    }
}

const isString = (param: any): boolean => {
    return typeof param === 'string'
}

const isCategoryType = (category: string): boolean => {
    return ["Task", "Quote", "Idea", "Random Thought"].includes(category)
}