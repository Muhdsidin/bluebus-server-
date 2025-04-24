const  express = require("express")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 7777
const PartnerRouter = require("./router/Partner")
const dotenv = require("dotenv").config()
const { PrismaClient } = require('@prisma/client')
const errorHandler = require("./middleware/Error")
const prisma = new PrismaClient()




app.use(cors());
app.use(express.json());
app.use(errorHandler)

app.use('/partner', PartnerRouter)


  app.post('/bus', async(req, res) => {
    const {email , name } = req.body
     try {
      

       const bus = await prisma.busAgency.findMany({
        include : {trips : true}
       })
 
       res.status(200).json(bus)
     } catch (error) {
         console.log(error.message)
     }  
   });



  
  // app.get('/get-user', async(req, res) => {
  //   try {
  //       const user = await prisma.user.findMany({
  //         include: { posts: true }  
  //       })
  //         res.json(user)
  //   } catch (error) {
  //       console.log(error.message)
  //   }
  // });



  console.log(process.env.DATABASE_URL)
  


app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));


