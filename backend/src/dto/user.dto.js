class UserDto {
  static fromModel(model) {
    return {
      id: model.id,
      name: model.name,
      email: model.email,
      accountBalance: model.accountBalance
    }
  }
}

export default UserDto;