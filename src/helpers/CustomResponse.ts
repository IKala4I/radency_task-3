import express from 'express'

interface CustomResponse extends express.Response {
    error?: any;
    data?: any;
}

export default CustomResponse