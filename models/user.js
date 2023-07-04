require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Subject = require('./subject')
const Submission = require('./submission')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: {type: String, required: true},
    email: {type: String, unique: true, lowercase: true, required: true},
    password: {type: String, minlength: 5, required: true},
    //must be a string which is one from enum array only
    role: {type: String, enum: ['admin', 'teacher', 'student'], required: true},
    loggedIn: Boolean,
    subject: {type: mongoose.Schema.Types.ObjectId, ref: 'Subject'},
    submissions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Submission'}]
}, {
    timestamps: true
})

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

//creates a token so that the user stays signed in
//set an expiration time so that the token will not last forever
userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({_id: this._id, expiresIn: '12h'}, process.env.SECRET)
    return token
}


const User = mongoose.model('User', userSchema)
module.exports = User