const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require("moment");
const SALT_I = 10;
require('dotenv').config();

const dataLiteracyTestSchema = mongoose.Schema({
    quizId: {
        type: Schema.Types.ObjectId,
        ref: 'quiz'
    },
    question: {
        type: String,
        trim: true,
    },
    options: [{
        optionId: {
            type: String,
            trim: true,
        },
        optionText: {
            type: String,
            trim: true,
        }
    }],
    sequence: {
        type: Number
    }

});

module.exports = mongoose.model('DataLiteracyTest', dataLiteracyTestSchema);