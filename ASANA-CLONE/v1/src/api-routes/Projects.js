const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");

const schemas = require("../validations/Projects")
const express = require ("express");

const {index, create , update , deleteProject} =require("../controllers/Projects")
const router = express.Router();

router.get("/",authenticate,index);
router.route("/").post(authenticate,validate(schemas.createValidation),create);
router.route("/:id").patch(authenticate,validate(schemas.updateValidation),update);
router.route("/:id").delete(authenticate,deleteProject);


module.exports = router;