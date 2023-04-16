const express = require("express");
const controller = require("./../Controllers/ClassController");
const {CheckAdmin} = require("./../Middlewares/authMW");
const router = express.Router();


router.route("/classes")
    .all(CheckAdmin)
    .get(controller.GetAllClasses)
    .post(controller.AddClass)
    .put(controller.UpdateClass)
    .delete(controller.DeleteClass)


   
router.route("/classes/:id")
    .all(CheckAdmin)
    .get(controller.GetClass) 
    .delete(controller.DeleteClass)
    module.exports=router;

