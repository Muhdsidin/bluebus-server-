const prisma = require("../../utils/Utility")
const FindTripInteractor = async (id)=>{
    try {
        const find = await prisma.busAgency.findUnique({
            where: {
              id,
            },
            include: { trips: true },
          });

          return find
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { FindTripInteractor }