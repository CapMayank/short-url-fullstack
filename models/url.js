const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [{ timestamp: {type: Number} }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },

},
{ timestamps: true }
);
//model
const URL = mongoose.model('URL', urlSchema);
//export model
module.exports = URL;