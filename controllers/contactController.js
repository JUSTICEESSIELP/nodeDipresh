const { response } = require("express");
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");




//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  console.log(`Get all contacts : req :  ${req}`)
  

  const foundContacts = await Contact.find({
    
  });

  if (foundContacts) res.status(204).json({ 'message': 'No employees found.' });
  if (foundContacts) res.status(200).json(foundContacts)


 

  // await Contact.find({}).exec((err, items)=>{
  //     if(err){
  //       res.sendStatus(400)
  //       res.json({
  //         "message": " We cannot find the items"
  //       })
  //     }
  //     res.sendStatus(200)
  //     res.json({
  //      "message": `${items.length} found`
  //     })
  // })
  // if(contacts){
  //   res.sendStatus(200)
  //   res.json({
  //     "message":"All contacts Found"
  //   })

 
});





//@desc Create New contact
//@route POST /api/contacts
//@access private
const createContact =  asyncHandler(async(req, res) => {
    console.log("The request body is :", req.body);
    // res.send(req)
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {

      res.status(400);
      throw new Error("All fields are mandatory !");
    }
    // const duplicates = Contact.find(  )
    

      const createdContact = await Contact.create({
        name:name, 
        email:email,  
        phone:phone,
  
      })
      

      res.sendStatus(201).json(createdContact)

    

    res.sendStatus(400)
  
  
  
  }

    
    )





//@desc Get contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler( async (req, res) => {
  const _id = req.params.id;
  // const {name } = req.body

  const foundContact = await Contact.findById(_id);
  if (!foundContact){
    res.sendStatus(404);
    res.json({
      "message": "user cannot be found in our records"
    })
  }
//   const contacts = await Contact.find({ user_id: req.user.id });

  res.status(200).json(foundContact);
    });




//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler( async (req, res) => {
    //   const contacts = await Contact.find({ user_id: req.user.id });
      if(!req?.params.id){
        return res.status(400).json({
          "message":"ID parameter is required"
        })
      }else{
        const contacts = await Contact.findOne({_id: req.params.id});
        // console.log(contacts)
        // console.log(contacts)
          if (!contacts){
            
            res.status(204)
            res.json({
              "messsage": `No employee matches ID ${req.params.id}`
            })
          }


          if (contacts._id == req.params.id ){
            console.log(`${contacts._id}   & ${req.params.id}`)
            console.log(req.body)
            const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true})

           res.send(updatedContact);
        
            
            // console.log(contacts._id === req.params.id)



           
          }else{
            res.status(403)
            throw  new Error("User dont have permission to update other user contacts ")

          }


      }
    

      
    
    

    
 
 

    

      
  
      // if(req.body.name)contacts.name = req.body.name;
      

      // if(req.body.email)contacts.email = req.body.email;

      

      // if(req.body.phone)contacts.phone = req.body.phone;

      

      // const result = await contacts.save()
      // res.json(result);
      
      


    })
//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async(req, res) => {
    //   const contacts = await Contact.find({ user_id: req.user.id });
      // res.status(200).json({
      //   "message":`contact ${req.params.id} `
      // });
      const _id = req.params.id
      console.log(_id);
      const foundContact = await Contact.findById(_id)
      if(!deleted){
        res.sendStatus(401);
        res.json({
          "message":"Request to delete cannot be fufilled. User is not in our records"
        })

      }
      Contact.removeOne({
        _id:req.params.id
      })
      res.sendStatus(200).json({
        "messsage":`Request to delete has been done . id ${_id} is no longer available `
      })
      

      
    });


const deleteAllContacts = asyncHandler(async(req, res)=>{
    // check if we have the id 
    //  if we have the sent as params then we find the document with that id 

   
    Contact.deleteMany().then(()=>{
      console.log('All files deleted')


    }).catch((err)=>{
      res.send(402)
      throw new Error(`Wrong request or There is no record available \t ${err} `)
    })

  })

module.exports = {
  deleteAllContacts,
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};