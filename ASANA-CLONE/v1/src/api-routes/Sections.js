const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");

const schemas = require("../validations/Sections")
const express = require ("express");

const {index, create , update , deleteSection} =require("../controllers/Sections")
const router = express.Router();

router.get("/:projectId",authenticate,index);
router.route("/").post(authenticate,validate(schemas.createValidation),create);
router.route("/:id").patch(authenticate,validate(schemas.updateValidation),update);
router.route("/:id").delete(authenticate,deleteSection);


module.exports = router;