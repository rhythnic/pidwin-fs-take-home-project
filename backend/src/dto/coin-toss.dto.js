import { Types } from "mongoose";
import UserDto from "./user.dto.js";

class CoinTossDto {
  static fromModel(model) {
    const dto = {
      id: model.id,
      wager: model.wager,
      chosenSide: model.chosenSide,
      won: model.won,
      bonus: model.bonus,
      createdAt: model.createdAt.toISOString()
    }

    if (model.user instanceof Types.ObjectId) {
      dto.user = model.user.toString();
    } else {
      dto.user = UserDto.fromModel(model.user);
    }

    return dto;
  }
}

export default CoinTossDto;