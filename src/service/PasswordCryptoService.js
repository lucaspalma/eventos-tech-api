const crypto = require('crypto');

class PasswordCryptoService {
    
    getSaltPassword(userPassword) {
        const length = 11;
        const salt = crypto.randomBytes(Math.ceil( length ))
                                .toString('hex')
                                .slice(0, length);
        var hash = crypto.createHmac('sha512', salt)
        hash.update(userPassword);
        const hashPassword = hash.digest('hex')
        return {
            salt : salt,
            password : hashPassword
        };
    }
    
    
}

module.exports = PasswordCryptoService