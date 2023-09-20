const bcrypt = require("bcryptjs");

//hash password
function hashPassword(password) {
  if (password != undefined && password != "") {
    password = bcrypt.hashSync(password, 8);
    return password;
  }
}
//checkk if unencrypted password is valid
function checkIfUnencryptedPasswordIsValid(password, unencryptedPassword) {
  return bcrypt.compareSync(unencryptedPassword, password);
}

//exclude password
function excludePassword() {
  return {
    uid: true,
    name: true,
    username: true,
    email: true,
    address: true,
    phone: true,
    createdAt: true,
    updatedAt: true,
  };
}

module.exports = {
  hashPassword,
  checkIfUnencryptedPasswordIsValid,
  excludePassword,
};
