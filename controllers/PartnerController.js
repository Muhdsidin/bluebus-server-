// import prisma = require("../utils/Utility")
const { HashPassword } = require("../utils/Bcrypt")
const { generateToken } = require("../utils/jwt")
const prisma = require("../utils/Utility")
const bcrypt = require("bcrypt")

const Reigister = async (req, res) => {
    try {
        const {email , name , password , phone} = req.body
        const hashedPAssword =await bcrypt.hash(password , 10);
        console.log(hashedPAssword)

        const Agency = await prisma.busAgency.create({
            data:{
                email :email,
                name :name,
                password :hashedPAssword,
                phone :phone,
                
            }
        })
        const token = generateToken(Agency.id)
        res.status(200).json({
          success : true,
          token  
        })

        

    } catch (error) {
       console.log(error.message)
    }
}


const Login = async (req, res) => {
  try {
    const {email , password} = req.body

    const user = await prisma.busAgency.findUnique({
       where :{
         email :email
       }   
    })

    if(!user){
      return res.status(401).json({
        success : false,
        message : "Email/Password is InCorrect "
      })
    }
    const checkPassWord = await bcrypt.compare(password , user.password)
    if( !checkPassWord){
      return res.status(401).json({
        success : false,
        message : "Email/Password is InCorrect "
      })
    }

    const token = generateToken(user.id)

    res.status(200).json({
      success : true,
      token
    })
  } catch (error) {
    console.log(error.message)
  }
}


const addTrip = async (req, res) => {
        const id = req.userId
        console.log(req.body)
        console.log(id)
        console.log(req.body.formData.busId)
        const item = req.body.formData
    try {
      const setTrip = await prisma.trip.create({
        data:{
          plate : item.numberPlate,
          BusId : item.busId,
          start :item.startFrom,
          where :item.destination,
          date :item.date,
          starttime :item.startTime,
          reachtime :item.endTime,
          price :item.price,
          decker :item.decker,
          type :item.acType,
          bus:{
            connect :{ id }
          }
        }
      })

      res.status(200).json({
        success : true ,
        message : "your Trip Is added Checkout"
      })
    } catch (error) {
        console.log(error.message)
    }

}

const getTrip = async (req, res) => {
  try {
  const id = req.userId    
  const find = await prisma.busAgency.findUnique({
   where :{
    id
   }, 
   include : {trips : true}
  })

  if(!find){
    return res.status(401).json({
      success : false,
      message : "Please Login or signup Before check "
    })
  }

  res.status(200).json(find.trips)
  } catch (error) {
    console.log(error.message)
  }
}


const deleteTrip = async (req, res) => {
  try {
    const {tripId  }= req.body
    if(!tripId){
      return res.status(404).json({
        success : false ,
        message : "Please provide Trip ID "
      })
    }

    const DeleteTrip = await prisma.trip.delete({
      where :{
        id :tripId
      }  
    })

    if(!DeleteTrip){
      return res.status(404).json({
        success : false ,
        message : "Please provide Trip ID "
      })
    }

    res.status(200).json({
      success : true,
      message : "Trip sucessFully Deleted"
    })
    
  } catch (error) {
    console.log(error.message) || error.message
  }
}

module.exports = {deleteTrip , addTrip , Reigister , Login , getTrip}

