import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const {Schema} = mongoose;

// User Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  profile: {
    firstName: {type: String},
    lastName: {type: String},
    isSubscribed: {type: Boolean}
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['ROLE_MEMBER', 'ROLE_ADMIN'],
    default: 'ROLE_MEMBER'
  },
  isMerchant: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: {type: String},
  resetPasswordExpires: {type: Date}
}, {
  timeStamps: true,
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt);
})
const User = mongoose.model('User', userSchema)
export default User