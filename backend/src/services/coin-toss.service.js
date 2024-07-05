import UserService from "./user.service.js";
import CoinToss, { CoinSide } from "../models/coin-toss.js";
import { InvalidInputError } from "../errors/index.js";

export default class CoinTossService {
  constructor(coinTossModel, userService) {
    this.model = coinTossModel || CoinToss;
    this.userService = userService || new UserService();
  }

  async create(user, coinTossRequest) {
    const { wager, side: chosenSide } = coinTossRequest;

    if (user.accountBalance < wager) {
      throw new InvalidInputError("Wager exceeds user's balance.");
    }

    const won = chosenSide === this.flipCoin();
    const bonus = won ? await this.calculateBonus(wager) : 0;
    
    const coinToss = await this.model.create({
      user: user._id,
      wager,
      chosenSide,
      won,
      bonus: bonus || void 0
    });

    const balanceAdjustment = coinToss.won ? (wager * 2) + bonus : 0 - wager;
    user.accountBalance = user.accountBalance + balanceAdjustment;
    await this.userService.update(user);

    coinToss.user = user;

    return coinToss;
  }

  async find(limit = 10) {
    return this.model.find({}).limit(limit).sort({ createdAt: -1 });
  }

  flipCoin() {
    const index = Math.floor(Math.random() * 2);
    return Object.values(CoinSide)[index];
  }

  /**
   * Bonus calculation rules
   * If the user wins 3 times in a row, the bonus is equivalent to the wager
   * If the user wins 5 times in a row, the bonus is 9x the wager
   * A winning streak resets after 5 wins. So a 6th consecutive win is equivalent to a
   * first win as far as bonus payouts are concerned.
   * @param {number} wager 
   * @returns 
   */
  async calculateBonus(wager) {
    const tosses = await this.find(4);

    let bonus = 0;
    let bonusCount = 0;

    for(let i = 0; i < tosses.length; i++) {
      const toss = tosses[i];
      if (!toss.won) return bonus;
      bonusCount += toss.bonus ? 1 : 0;
      if (i == 1 && bonusCount === 0) bonus = wager;
      if (i == 3 && bonusCount === 1 && tosses[1].bonus) bonus = wager * 9;
    }

    return bonus;
  }
  
}