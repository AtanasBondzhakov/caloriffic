import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password should be at least 4 characters long']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    calculation: {
        bmi: Number,
        bfk: Number,
        lbm: Number,
        bmr: Number,
        dci: Number,
        dit: Number,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
}, { timestamps: true });

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hash;
})

const User = model('User', userSchema);

export default User;