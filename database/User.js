import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4()
    },
    nome: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true,
        select: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    createAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    updateAt: {
        type: Date,
        default: () => Date.now()
    },
});

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified('senha')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.senha, salt, function (err, hash) {
            if (err) return next(err);
            user.senha = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.senha, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


export default mongoose.model("User", userSchema);