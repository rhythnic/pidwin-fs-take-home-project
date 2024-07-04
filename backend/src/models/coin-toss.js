import mongoose, { SchemaTypes } from "mongoose";

export const CoinSide = {
    Heads: "heads",
    Tails: "tails"
}

const coinTossSchema = mongoose.Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  wager: {
    type: Number,
    required: true,
  },
  chosenSide: {
    type: String,
    required: true,
    enum: Object.values(CoinSide),
  },
  flipSide: {
    type: String,
    required: true,
    enum: Object.values(CoinSide),
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

export default mongoose.model("CoinToss", coinTossSchema);