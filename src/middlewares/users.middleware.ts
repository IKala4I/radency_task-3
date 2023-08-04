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

const isString = (param: any): boolean => {
    return typeof param === 'string'
}

const isCategoryType = (category: string): boolean => {
    return ["Task", "Quote", "Idea", "Random Thought"].includes(category)
}