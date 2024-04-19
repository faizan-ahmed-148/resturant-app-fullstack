const express = require("express");
const { 
    register, 
    login, 
    logout, 
    updatePassword, 
    forgotPassword, 
    resetPassword, 
    getUserdetails, 
    updateProfile, 
    deleteUser, 
    updateUserRole, 
    getSingleUser, 
    getAllUser,
    contact} = require("../controllers/UserController");
const { isAuthenticated, authorizeRole } = require("../middlewares/auth");
const router  = express.Router()





router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/update/password").put(isAuthenticated ,updatePassword)
router.route("/forgot/password").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);
router.route("/contact/me").post(contact)
router.route("/me").get(isAuthenticated, getUserdetails);

router.route("/me/update").put(isAuthenticated, updateProfile);


router
  .route("/admin/users")
  .get(isAuthenticated, authorizeRole("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeRole("admin"), getSingleUser)
  .put(isAuthenticated, authorizeRole("admin"), updateUserRole)
  .delete(isAuthenticated, authorizeRole("admin"), deleteUser);

module.exports = router