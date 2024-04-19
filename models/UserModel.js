const mongoose = require("mongoose")
const validator = ("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please enter your Name"],
        maxLength: [30, "name cannot be exceed 30 character"],
        minLength: [4, "name should have 4 characters"]
    },
    email: {
        type: String,
        required: [true, " Please Enter your Email"],
        unique: true,
        validator: [validator.isEmail, "Please Enter A Valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [9, "Password Should be greator than 8 charactors"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date

})


userSchema.pre("save", async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)

    }
    next()
})

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = function (){
    return jwt.sign({_id:this._id}, process.env.JWT_SECRET)
}


userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };

  
module.exports = mongoose.model("User", userSchema);