import mongoose from 'mongoose'

const NoteSchema = new mongoose.Schema({
    name: {type: String, required: true},
    created: {type: Date, default: Date.now},
    category: {type: String, required: true},
    content: {type: String, default: ""},
    dates: {type: String, default: ""},
    archived: {type: Boolean, default: false}
})

NoteSchema.pre('save', function (next) {
    const content = this.get('content')
    const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g
    const dates = content.match(dateRegex)?.join(', ') || ''
    this.set('dates', dates)
    next()
})
export const NoteModel = mongoose.model('Note', NoteSchema)

// Note Actions
export const getUsers = () => NoteModel.find()
export const getUserByEmail = (email: string) => NoteModel.findOne({email})
export const getUserBySessionToken = (sessionToken: string) => NoteModel.findOne({'authentication.sessionToken': sessionToken})
export const getUserById = (id: string) => NoteModel.findById(id)
export const createNote = (values: Record<string, any>) => new NoteModel(values).save().then((note) => note.toObject())
export const deleteUserById = (id: string) => NoteModel.findOneAndDelete({_id: id})
export const updateUserById = (id: string, values: Record<string, any>) => NoteModel.findByIdAndUpdate(id, values)