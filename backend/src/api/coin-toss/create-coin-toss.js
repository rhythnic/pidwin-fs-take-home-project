import CoinTossService from "../../services/coin-toss.service.js";
import UserService from "../../services/user.service.js";
import CoinTossDto from "../../dto/coin-toss.dto.js";

const createCoinToss = async (req, res, next) => {
  try {
    let user = await new UserService().getUserOrFail(req.userId);
    const coinToss = await new CoinTossService().createCoinToss(user, req.body);
    res.status(200).json(CoinTossDto.fromModel(coinToss));
  } catch (error) {
    next(error);
  }
};

export default createCoinToss;