const jwt = require("jsonwebtoken");

module.exports=(request,response,next)=>{

    //search for the token

    try{

       const token = request.get("Authorization").split(" ")[1];

       const decodedToken = jwt.verify(token,"ITIPDAlexTrack");
        
       request.decodedToken=decodedToken;
       next();
    }

    catch(error)
    {

        next(new Error("Not Authenticated"));
    }
    


}


module.exports.CheckAdmin=(request,response,next)=>{
    
    if(request.decodedToken.role=="admin")
    next()
    else
    next(new Error("Not Authorized for teacher"))
}


module.exports.CheckTeacher=(request,response,next)=>{
    
    if(request.decodedToken.role=="teacher")
    next()
    else
    next(new Error("Not Authorized for admin"))
}




module.exports.CheckTeacherAdmin=(request,response,next)=>{
    
    if(request.decodedToken.role=="admin"|| request.decodedToken.role=="teacher")
    next()
    else
    next(new Error("Not Authorized for admin and teacher"))
}








