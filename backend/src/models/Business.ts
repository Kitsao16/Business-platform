// src/models/Business.ts

import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
});

const Business = mongoose.model('Business', businessSchema);

export default Business;