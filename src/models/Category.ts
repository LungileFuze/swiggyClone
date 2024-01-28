import * as mongoose from 'mongoose'
import { model } from 'mongoose'

const categorySchema = new mongoose.Schema({
    restuarant_id: {type: mongoose.Types.ObjectId, ref: 'restuarants', required: true},
    name: {type: String, required: true},
    created_at: {type: Date, required: true, default: new Date()},
    updated_at: {type: Date, required: true, default: new Date()}
})

export default model('categories', categorySchema)