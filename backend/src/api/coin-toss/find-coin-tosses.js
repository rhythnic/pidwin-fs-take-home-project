import CoinTossService from "../../services/coin-toss.service.js";
import CoinTossDto from "../../dto/coin-toss.dto.js";

const findCoinTosses = async (req, res, next) => {
  try {
    const coinTosses = await new CoinTossService().find(req.query.limit);
    const dtos = coinTosses.map(CoinTossDto.fromModel);
    res.status(200).json({ data: dtos });
  } catch (error) {
    next(error);
  }
};

export default findCoinTosses;