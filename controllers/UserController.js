const prisma = require("../utils/Utility");

const FindBus = async (req, res) => {
  try {
    const { from, where, date } = req.body;
    const findBus = await prisma.trip.findMany({
      where: {
        start: from,
        where: where,
        date,
      },
    });

    if (!findBus) {
      return res.status(404).json({
        success: false,
        message: "there is no travel bus are available ",
      });
    }

    res.status(200).json(findBus);
  } catch (error) {
    console.log(error.message) || error.message;
    res.status(500).json({ message: 'failed from Server Side ' });
  }
};

module.exports = { FindBus };
