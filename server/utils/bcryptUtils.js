const bcrypt = require('bcrypt');

const compareString = async(str, hash) => {
  return await bcrypt.compare(str, hash);
}

const hashString = async(str, cycles) => {
  return await bcrypt.hash(str, cycles)
};

module.exports = { compareString, hashString };