const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const TeacherRoute = require("./Routes/TeacherRoute");

const ChildRoute = require("./Routes/ChildRoute");

const ClassRoute = require("./Routes/ClassRoute");

const LoginRouter = require("./Routes/AuthenticationRoute");

const authMW = require("./Middlewares/authMW");




const server=express(); 

server.use(morgan(':method :url :status :response-time ms'));


mongoose.connect("mongodb://127.0.0.1:27017/ITIDB")
        .then(()=>{

            console.log("DB Connected....");
            
            server.listen(process.env.PORT || 8080,()=>{
                console.log("Server is listenining ,.....")
            });
            
        })
        .catch(error=>{

            console.log("DB problem " + error);
        })



//First Middleware   (Logging)

server.use((request,response,next)=>{

    console.log(request.url,request.method);

    // response.json({message:"Welcome to our Server"});    mesh wazeeftha 2nha trod 3al user    2l teacher Router 2w 2l class Router hya 2l 2l mafrod trod

    next();
})  






        // //Second Middleware      simulation for  (Authorization)  (Fake)
        // server.use((request,response,next) =>{

        //     if(true) {

        //         // response.json({message : "Authorized"})
        //         // consol.log("");
        //         next();

        //     }

        //     else {
                
        //         next(new Error("not Authorized"))
        //     }

        // })



        //////------------ Routes (End Points)

server.use(express.json());        //talet shakl 2li howa 2l http body
//server.use(express.urlencoded());

server.use(LoginRouter);

server.use(authMW);

server.use(ClassRoute);

server.use(TeacherRoute);

server.use(ChildRoute);












//Third Middleware      (Not Found Middleware)

server.use((request,response)=>{

    response.status(404).json({Message : "Page Not Found"})
})




//Fourth Middleware      (Error Middleware)     Try and Catching the Exceptions            Any Syntax Error

server.use((error , request , response , next)=>{

    response.status(500).json({Message : " exception : " + error})
})

