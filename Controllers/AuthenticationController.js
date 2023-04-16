const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
require("./../Models/TeacherModel");


const TeacherSchema =  mongoose.model("teachers");






exports.Login=function(request,response,next){

    //static admin email :x@x.com  , password :123
    if(request.body.Email=="x@x.com"&&request.body.Password=="123")
    {

        const token=jwt.sign({
            id:1,
            role:"admin",
            userName:"x"
        },"ITIPDAlexTrack",{expiresIn:"20h"});        

        response.status(200).json({data:"OK",token})
    }
    else
    {
        TeacherSchema.findOne({Email:request.body.Email,
                            Password:request.body.Password})
                    .then(user=>{
                        if(user==null)
                        {
                            throw new Error("Username or password incorrect..")
                        }

                        const token=jwt.sign({
                            id:user._id,
                            role:"teacher"
                        },"ITIPDAlexTrack",{expiresIn:"20h"});        
                
                        response.status(200).json({data:"OK",token})

                    })
                    .catch(error=>next(error))



    }
  
}



















// exports.Login = function(request,response,next){

//     //static admin email  :x@x.com  , password :123

//     if(request.body.Email =="x@x.com" && request.body.Password == "123" )
//     {
//        const token = jwt.sign({
        
//         id: 1,
//         role:"admin",
//         Userame:"x"
//        },"ITIDAlexTrack",{expiresIn:"1h"});

//         response.status(200).json({Data: "OK",token});
//     }
//     else
//     {

//         TeacherSchema.findOne({Email:request.body.Email,
//             Password:request.body.Password})
//             .then(user=>{
//                 if(user==null)
//                 {
//                     throw new Error("Username or Password is incorrect..")
//                 }

//                 const token = jwt.sign({
        
//                     id:user._id,
//                     role:"Teacher",                   
//                    },"ITIDAlexTrack",{expiresIn:"1h"});
            
//                     response.status(200).json({Data: "OK",token});
//             })

//             .catch(error=>
//                 next(error))
//     }

// }
    
    