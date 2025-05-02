const prisma = require("../../utils/Utility")
const AddTripInteractor = async(item , id) => {
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

          return "successFully Trip Added "
        
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { AddTripInteractor }