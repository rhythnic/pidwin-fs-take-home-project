class UserDto {
    static fromModel(model) {
        return {
            _id: model._id,
            name: model.name,
            email: model.email,
            accountBalance: model.accountBalance
        }
    }
}

export default UserDto;