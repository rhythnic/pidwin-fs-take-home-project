import UserService from "./user.service.js";
import CoinToss, { CoinSide } from "../models/coin-toss.js";

export default class CoinTossService {
  constructor(coinTossModel, userService) {
    this.model = coinTossModel || CoinToss;
    this.userService = userService || new UserService();
  }

  async createCoinToss(user, coinTossRequest) {
    const { wager, side: chosenSide } = coinTossRequest;

    if (user.accountBalance < wager) {
      throw new InvalidInputError("Wager exceeds user's balance.");
    }

    const coinToss = await this.model.create({
      user: user._id,
      wager,
      chosenSide,
      flipSide: this.flipCoin()
    });

    let won = coinToss.chosenSide === coinToss.flipSide;
    const balanceAdjustment = won ? wager * 2 : 0 - wager;
    user.accountBalance = user.accountBalance + balanceAdjustment;
    await this.userService.update(user, { accountBalance });

    coinToss.user = user;

    return coinToss;
  }

  flipCoin() {
    const index = Math.floor(Math.random() * 2);
    return CoinSide.values()[index];
  }
}