const express = require("express");

const controller = require("./../Controllers/ChildController");
const {CheckAdmin} = require("./../Middlewares/authMW");


const router = express.Router();


router.route("/childs")
    .all(CheckAdmin)
    .get(controller.GetAllChilds)
    .post(controller.AddChild)
    .put(controller.UpdateChild)
    .delete(controller.DeleteChild)

router.route("/childs/:id")
    .all(CheckAdmin)
    .get(controller.GetAllChilds)
    .delete(controller.DeleteChild)

    module.exports=router;