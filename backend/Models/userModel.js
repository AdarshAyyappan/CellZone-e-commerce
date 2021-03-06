import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
    {
        avatar:{
            public_id:{
                type:String,
            },
            url:{
                type:String,
            }
    
        },
        name: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        isBlocked:{
            type:Boolean,
            required: true,
            default:false,
        },
        reffId:{
            type:String,
        },
        wallet: {
            type: Number,
            required: true,
            default: 0
        },
    },
    {
        timestamps: true,
    }
)
userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
})


const User = mongoose.model('User', userSchema)

export default User