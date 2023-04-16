const mongoose = require("mongoose");


require("./../Models/ChildModel");


const ChildSchema =  mongoose.model("childs");

exports.GetAllChilds = function(request,response,next){
    
        //fetch query string
        // console.log(request.query);
        //fetch parameter
        //  console.log(request.params);
        

         ChildSchema.find({})
         .then(data=>{
            response.status(200).json({data});
 
         })
         .catch(error=>{
             
            next(error)
         })

}


exports.GetChild = function(request,response,next){
    
    ChildSchema.findOne({_id:request.params.id})
    .then(child=>{
        if(child == null)
        {
            throw new Error("Child not Exists...");
        }
        response.status(200).json({child});
    })
    .catch(error=>{
        next(error);
    })

    
}



exports.AddChild =(request,response ,next)=>{
    
    // console.log(request.body);
    let object = new ChildSchema({

        _id: request.body.id,                         
        ChildName: request.body.ChildName,
        Age: request.body.Age,
        Level: request.body.Level,
        Address: {
            City:request.body.Address.City,
            Street:request.body.Address.Street,
            Building:request.body.Address.Building
        }
    });

    object.save()
    .then(data=>{
        response.status(201).json({data});
    })
    .catch(error=>{
        next(error);
    })
}



exports.UpdateChild = (request, response,next) => {
    const updateFields = {
      ChildName: request.body.ChildName,
      Age: request.body.Age,
      Level: request.body.Level,
    };
  
    if (request.body.Address) {
      const addressFields = {};
      if (request.body.Address.City) {
        addressFields.City = request.body.Address.City;
      }
      if (request.body.Address.Street) {
        addressFields.Street = request.body.Address.Street;
      }
      if (request.body.Address.Building) {
        addressFields.Building = request.body.Address.Building;
      }
  
      // Set only the specified address field using $set
      ChildSchema.updateOne(
        { _id: request.body.id },
        { $set: {
          ChildName: request.body.ChildName,
            Age: request.body.Age,
            Level: request.body.Level,
           ["Address." + Object.keys(addressFields)[0]]: addressFields[Object.keys(addressFields)[0]]} },

      )
        .then((data) => {
          response.status(200).json({ data: "Updated" });
        })
        .catch((error) => {
          console.log("UpdateChild failed with error:", error);
          next(error);
        });
    } else {
      // Remove any unset address fields using $unset
      ChildSchema.updateOne(
        { _id: request.body.id },
        { $unset: { "Address.City": "", "Address.Street": "", "Address.Building": "" } }
      )
        .then((data) => {
          console.log("UpdateChild succeeded with data:", data);
          response.status(200).json({ data: "Updated" });
        })
        .catch((error) => {
          console.log("UpdateChild failed with error:", error);
          next(error);
        });
    }
  };
  




  



// exports.UpdateChild = (request,response)=>{

//     // console.log(request.body);
//     ChildSchema.updateOne({
//         _id:request.body.id
//     },{
//         $set:{
//             FullName : request.body.FullName,
//             Age : request.body.Age,
//             Level : request.body.Level,
//             Address: {
//                 City:request.body.Address?.City,
//                 Street:request.body.Address?.Street,
//                 Building:request.body.Address?.Building
//             }
//         }

//     })
//         .then(data=>{
//             response.status(200).json(data);
//         })
//         .catch(error=>{
//             next(error);
//         })

// }








exports.DeleteChild = (request, response, next) => {
  const childId = request.params.id;

  ChildSchema.findById(childId)
    .then((child) => {
      if (!child) {
        response.status(404).json({ message: "Child not found" });
      } else {
        ChildSchema.deleteOne({ _id: childId })
          .then(() => {
            response.status(200).json({ message: "Child deleted successfully" });
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





// exports.DeleteChild = (request,response)=>{
    
//     console.log(request.body);
//     response.status(200).json({Message : "Delete Child"});
// }


