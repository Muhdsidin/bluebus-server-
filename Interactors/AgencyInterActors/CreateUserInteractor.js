const prisma = require("../../utils/Utility")

const CreateUserInteractor = async ( name , email , hashedPAssword , phone ) => {
 try {
  const data =  await  prisma.busAgency.create({
        data:{
            email :email,
            name :name,
            password :hashedPAssword,
            phone :phone,
            
        }
    })

    return data
 } catch (error) {
    console.log(error.message)
 }   
}

module.exports = {CreateUserInteractor}