import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt'
import config from '../../config';

const userSchema = new Schema<TUser>({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value: string) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                    value
                );
            },
        },
        immutable: true,
    },
    password: { type: String, required: true },
    photo: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
    },
    userStatus: {
        type: String,
        enum: ['active', 'inactive'],
        required: true,
    },
});

// userSchema.pre("find",function (next) {
//     this.find({userStatus : {$eq:"active"}});
//     next()
// })
// userSchema.post("find",function(docs,next){
//     docs.forEach((doc:TUser) => {
//         doc.name = doc.name.toUpperCase();
//     });
//     next();
// })

userSchema.pre("save", async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, Number(config.salt_round));
    next();
})
userSchema.post("save", async function (doc, next) {
    doc.password = "";
    next();
})

const User = model<TUser>('User', userSchema);
export default User;
