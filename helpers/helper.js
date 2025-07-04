const bcrypt = require('bcryptjs')

function hashPassword(user){
            const salt = bcrypt.genSaltSync(8);
            const hash = bcrypt.hashSync(user.password, salt);
            user.password = hash
}

module.exports = hashPassword