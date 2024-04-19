const User = require("../models/UserModel")
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const { sendEmail } = require("../middlewares/SendEmail")
const { ContactEmail } = require("../middlewares/ContactEmail")


// register 

exports.register = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body

    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ success: false, message: "User Already Exists" })
    }

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "EcommerceAvatars",
      width: 150,
      crop: "scale",
    })

    user = await User.create({
      name, email, password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
      }
    });


    const token = await user.generateToken()
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true
    }
    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token
    })


  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// login 

exports.login = async (req, res) => {
  try {

    const { email, password } = req.body

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Does not Exist"
      })
    }
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return res.status(500).json({
        success: false,
        message: "incorrect Password"
      })
    }

    const token = await user.generateToken()
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true
    }
    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}



// logout user 

exports.logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//   Update Password 

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide old and new password",
      });
    }

    const isMatch = await user.matchPassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Old password",
      });
    }
    if (newPassword !== req.body.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password and confirm password does not match",
      });
    }
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// forgot password 

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }


    const resetPasswordToken = user.getResetPasswordToken();

    await user.save();

    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetPasswordToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message,
      });

      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });

    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//   reset Password 
exports.resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or has expired",
      });
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password and confirm password does not match",
      });
    }

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// contact 
exports.contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const userMessage = `Name: ${name}. Email: ${email}. Message: ${message}.`;

    await ContactEmail(userMessage);

    return res.status(200).json({
      success: true,
      message: "Message Sent Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// get user detail

exports.getUserdetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found"
      })
    }

    res.status(200).json({
      success: true,
      user
    })

  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message
    })
  }
}


// update user profile 

exports.updateProfile = async (req, res) => {
   try {
      const user = await User.findById(req.user._id);
  
      const { name, email, avatar } = req.body;
   
  
      if (name) {
        user.name = name;
      }
      if (email) {
        user.email = email;
      }
  
      if (avatar) {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: "EcommerceAvatars",
        });
        user.avatar.public_id = myCloud.public_id;
        user.avatar.url = myCloud.secure_url;
      }
  
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "Profile Updated",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
  }

}



// get all users(admin)

exports.getAllUser = async (req, res) => {

  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      users
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// get single user (Admin)

exports.getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({
        success: true,
        message: "User does not Exist"
      })
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// update user role --admin
exports.updateUserRole = async (req, res) => {
  try {
    const { name, email, role } = req.body

    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(400).json({
        success: true,
        message: "User does not Exist"
      })
    }
    const newUserData = {
      name,
      email,
      role
    }

    await User.findByIdAndUpdate(user, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
    )

    res.status(200).json({
      success: true,
      message: "Updated Successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }

}


// Delete User --Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({
        success: true,
        message: "User does not Exist"
      })
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
};