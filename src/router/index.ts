import express from 'express'

import notes from './notes'

const router = express.Router()

export default (): express.Router => {
    notes(router)

    return router
}