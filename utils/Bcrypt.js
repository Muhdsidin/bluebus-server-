const bcrypt = require('bcrypt');

const HashPassword = (password , num )=>{
    const hashedPAssword = bcrypt.hash(password , num);
    return hashedPAssword;
}

module.exports = { HashPassword}