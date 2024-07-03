class UserDto {
    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.email = model.email;
        this.accountBalance = model.accountBalance;
    }
}

export default UserDto;