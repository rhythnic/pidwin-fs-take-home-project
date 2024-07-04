import { Types } from "mongoose";
import UserDto from "./user.dto";

class CoinTossDto {
  static fromModel(model) {
    const dto = {
      id: model.id,
      wager: model.wager,
      chosenSide: model.chosenSide,
      flipSide: model.flipSide,
      createdAt: model.createdAt.toISOString()
    }

    if (model.user instanceof Types.ObjectId) {
      dto.user = model.user.toString();
    } else {
      dto.user = UserDto.fromModel(dto.user);
    }

    return dto;
  }
}

export default CoinTossDto;