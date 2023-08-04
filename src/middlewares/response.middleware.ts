import express from 'express'
import CustomResponse from '../helpers/CustomResponse'

export const responseMiddleware = (req: express.Request, res: CustomResponse, next: express.NextFunction) => {
    if (res.error) {
        const {message} = res.error
        return res.json({
            error: true,
            message
        })
    }
    return res.json(res.data)
}