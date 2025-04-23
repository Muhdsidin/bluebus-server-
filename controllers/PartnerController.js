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


const addTrip = async (req, res) => {
   
        const {plate ,info ,  busId , startFrom , whereTo , date , startTime , reachTime , price , decker , type} = req.body
        const id = req.userId
    try {
      const setTrip = await prisma.trip.create({
        data:{
          plate :plate,
          BusId :busId,
          start :startFrom,
          where :whereTo,
          date :date,
          starttime :startTime,
          reachtime :reachTime,
          price :price,
          decker :decker,
          type :type,
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


module.exports = {addTrip , Reigister}

