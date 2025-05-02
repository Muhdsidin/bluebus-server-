const prisma = require("../../utils/Utility")

const DeleteTripInteractor = async (tripId) => {
    try {
        const DeleteTrip = await prisma.trip.delete({
            where: {
              id: tripId,
            },
          });

          return "succesFully  Deleted "
      
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { DeleteTripInteractor}