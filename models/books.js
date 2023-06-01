const {Schema, model} = require('mongoose');

const bookSchema = new Schema({

    title: {
        type: String,
        required:true
    },
    desc: {
        type: 'String',
        required:true
    },
    authors: {
        type: String,
        default:""
    },
    favorite: {
        type: String,
        default:""
    },
    fileCover: {
        type: String,
        default:""
    },
    fileName: {
        type: String,
        default:""
    }
});

module.exports = model('Books', bookSchema);