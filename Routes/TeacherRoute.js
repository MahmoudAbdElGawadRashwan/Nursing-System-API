const express = require("express");
const controller = require("../Controllers/TeacherController")
const {CheckTeacherAdmin} = require("./../Middlewares/authMW");
const router = express.Router();


router.route("/teachers")
     .all(CheckTeacherAdmin)
    .get(controller.GetAllTeachers)   //el endpoint  get law hatrod 3alek bi HTML yb2a keda deh View  ya2ma hatrod 3alek bi Data yb2a keda deh API
    .post(controller.AddTeacher)
    .put(controller.UpdateTeacher)
    .delete(controller.DeleteTeacher);



    router.route("/teachers/:id")
    .all(CheckTeacherAdmin)
    .get(controller.GetAllTeachers)
    .delete(controller.DeleteTeacher)    
    module.exports=router;