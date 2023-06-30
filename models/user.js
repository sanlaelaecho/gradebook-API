require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: {type: String, required: true},
    email: {type: String, unique: true, lowercase: true, required: true},
    password: {type: String, minlength: 5, required: true},
    role: {type: String, enum: ['admin', 'teacher', 'student'], required: true},
    loggedIn: Boolean,
    cohort: {type: mongoose.Schema.Types.ObjectId, ref: 'Cohort'}
}, {
    timestamps: true
})

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})
userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({_id: this._id, expiresIn: '12h'}, process.env.SECRET)
    return token
}
//creates a token so that the user stays signed in
//set an expiration time so that the token will not last forever

const User = mongoose.model('User', userSchema)
module.exports = User