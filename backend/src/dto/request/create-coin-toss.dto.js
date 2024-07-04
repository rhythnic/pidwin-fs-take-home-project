import { object, number, enums, min } from 'superstruct'
import { CoinSide } from '../../models/coin-toss';

const CreateCoinTossRequest = object({
  wager: min(number(), 0, { exclusive: true }),
  side: enums(CoinSide.values()),
});

export default CreateCoinTossRequest;