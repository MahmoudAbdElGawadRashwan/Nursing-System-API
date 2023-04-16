const mongoose = require("mongoose");

require("./../Models/ClassModel");


const ClassSchema =  mongoose.model("classes");

const TeacherSchema = mongoose.model("teachers");

exports.GetAllClasses = function(request,response,next){
    
        //fetch query string
        // console.log(request.query);

        //fetch parameter
        // console.log(request.params);


        ClassSchema.find({})
        .populate({path:"Supervisor",select:{FullName:1}})
        .then(data=>{
            response.status(200).json({data});

        })
        .catch(error=>{
            
            next(error)
        })
}


exports.GetClass = function(request,response,next){
    

    ClassSchema.findOne({_id:request.params.id})
    .populate({path:"Supervisor",select:{FullName:1}})
    .then(Class=>{
        if(Class == null)
        {
            throw new Error("Class not Exists...");
        }
        response.status(200).json({Class});
    })
    .catch(error=>{
        next(error);
    })

    
}




exports.AddClass = (request,response,next)=>{
    
     // console.log(request.body);

     
     TeacherSchema.findOne({_id:request.body.Supervisor})
     .then(Supervisor=>{
        if(Supervisor == null)
        throw new Error ("Supervisor doesn't Exist");

        let object = new ClassSchema({

        
            _id: request.body.id,
            ClassName: request.body.ClassName,
            Children: request.body.Children,
            Supervisor: request.body.Supervisor
    
        });
    

         return object.save();

    })
        .then(data=>{
        response.status(201).json(data);


        })
        .catch(error=>{
        next(error);
    })
}




exports.UpdateClass = (request,response,next)=>{

    // console.log(request.body);
    ClassSchema.updateOne({
        _id:request.body.id
    },{
        ClassName: request.body.ClassName,
        Supervisor: request.body.Supervisor,
        Children: request.body.Children
    })
        .then(data=>{
            response.status(200).json({data:"Updated"});
        })
        .catch(error=>{
            next(error);
        })
}




exports.DeleteClass = async (request, response, next) => {
    try {
      const classId = request.params.id;
      const deletedClass = await ClassSchema.findByIdAndDelete(classId);
      if (!deletedClass) {
        return response.status(404).json({ message: "Class not found" });
      }
      return response.status(200).json({ message: "Class deleted successfully" });
    } catch (error) {
      next(error);
    }
  };



// exports.DeleteClass = (request,response)=>{
    
//     console.log(request.body);
//     response.status(200).json({Message : "Delete Class"});
// }