import { object, number, enums, min } from 'superstruct'
import { CoinSide } from '../../models/coin-toss.js';

const CreateCoinTossRequest = object({
  wager: min(number(), 0, { exclusive: true }),
  side: enums(Object.values(CoinSide)),
});

export default CreateCoinTossRequest;