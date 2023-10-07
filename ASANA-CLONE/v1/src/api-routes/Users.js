const validate = require("../middlewares/validate");
const schemas = require("../validations/Users")

const authenticate = require("../middlewares/authenticate");
const express = require ("express");
const {create , index , login , projectList , resetPassword , deleteUser , updateProfileImage} =require("../controllers/Users");
const router = express.Router();

router.get("/",index);
router.route("/").post(validate(schemas.createValidation),create);
router.route("/login").post(validate(schemas.loginValidation),login);
router.route("/projects").get(authenticate,projectList);
router.route("/reset-password").post(validate(schemas.resetPasswordValidation),resetPassword);
router.route("/update-profile-image").post(authenticate,updateProfileImage);
router.route("/:id").delete(authenticate,deleteUser);


module.exports = router;