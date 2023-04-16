const mongoose = require("mongoose");


require("./../Models/TeacherModel");


const TeacherSchema =  mongoose.model("teachers");





exports.GetAllTeachers = function(request,response,next){
    
    // fetch query string
    // console.log(request.query);

     //fetch parameter
    // console.log(request.params);

    TeacherSchema.find({})
                .then(data=>{
                    response.status(200).json({data});


                })
                .catch(error=>{
                    
                    next(error)
                })
}


exports.GetTeacher = function(request,response,next){
    
    TeacherSchema.findOne({_id:request.params.id})
            .then(teacher=>{
                if(teacher == null)
                {
                    throw new Error("Teachers not Exists...");
                }
                response.status(200).json({teacher});
            })
            .catch(error=>{
                next(error);
            })

}



exports.AddTeacher =(request,response,next)=>{
    
    // console.log(request.body);

    let object = new TeacherSchema({
        // _id : 7,
        // _id: request.body.id,
        FullName : request.body.FullName,
        Password : request.body.Password,  
        Email : request.body.Email,
        Image : request.body.Image

    });

    object.save()
    .then(data=>{
        response.status(201).json({data});
    })
    .catch(error=>{
        next(error);
    })
}







exports.UpdateTeacher = (request, response, next) => {
  let teacherId = request.body.id;
  let newEmail = request.body.Email;
  TeacherSchema.findOne({ Email: newEmail })
    .then((teacher) => {
      if (teacher && teacher._id != teacherId) {
        response.status(400).json({ message: "Email already exists" });
      } else {
        let hashPass = request.body.password ? bcrypt.hashSync(request.body.password, salt) : request.body.password;
        TeacherSchema.updateOne(
          { _id: teacherId },
          {
            FullName: request.body.FullName,
            Password: hashPass,
            Email: newEmail,
            Image: request.body.Image,
          }
        )
          .then((data) => {
            response.status(200).json({ data: "Updated" });
          })
          .catch((error) => {
            next(error);
          });
      }
    })
    .catch((error) => {
      next(error);
    });
};










// exports.UpdateTeacher = (request,response ,next)=>{

//     // console.log(request.body);
//     let hashPass = request.body.password ? bcrypt.hashSync(request.body.password, salt) : request.body.password;
//     TeacherSchema.updateOne({
//         _id:request.body.id
//     },{
//         FullName : request.body.FullName,
//         Password : hashPass,
//         Email : request.body.Email,
//         Image : request.body.Image
//     })
//         .then(data=>{
//             response.status(200).json({data:"Updated"});
//         })
//         .catch(error=>{
//             next(error);
//         })


// }




exports.DeleteTeacher = (request, response, next) => {
    const TeacherId = request.params.id;
  
    TeacherSchema.deleteOne({ _id: TeacherId })
      .then(() => {
        response.status(200).json({ message: "Teacher deleted successfully" });
      })
      .catch((error) => {
        next(error);
      });
  };






  exports.DeleteTeacher = (request, response, next) => {
    const TeacherId = request.params.id;
  
    TeacherSchema.findById(TeacherId)
      .then((Teacher) => {
        if (!Teacher) {
          response.status(404).json({ message: "Teacher not found" });
        } else {
            TeacherSchema.deleteOne({ _id: TeacherId })
            .then(() => {
              response.status(200).json({ message: "Teacher deleted successfully" });
            })
            .catch((error) => {
              next(error);
            });
        }
      })
      .catch((error) => {
        next(error);
      });
  };
  