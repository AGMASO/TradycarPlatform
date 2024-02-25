//Este fichero lo creamos solo para importar el abi.json y contractAddresses.json aqui, y luego exportarlo de una .

const abi = require("./abi.json");
const abiTradify = require("./abiTradify.json");
const abiEscrow = require("./abiEscrow.json");

module.exports = { abi, abiTradify, abiEscrow };
