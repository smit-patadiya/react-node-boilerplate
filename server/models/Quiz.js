const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require("moment");
const SALT_I = 10;
require('dotenv').config();

const QuizSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    uniqueId: {
        type: String,
        trim: true,
    },
    title: {
        type: String,
        trim: true,
    }
});

module.exports = mongoose.model('quiz', QuizSchema);