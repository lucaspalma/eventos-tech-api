const PasswordCryptoService = require('../service/PasswordCryptoService')

class UserAction {

    constructor() {
        this.passwordCrypto = new PasswordCryptoService();
    }

    getUser(userDto) {
        const saltPassword = this.passwordCrypto.getSaltPassword(userDto.password);
        return {
            name : userDto.name,
            email : userDto.email,
            password : saltPassword.password,
            salt : saltPassword.salt
        }
    }

}

module.exports = UserAction