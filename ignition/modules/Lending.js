const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Lending", (m) => {

    const tGPC = m.contract("MockERC20");
    const tUSDT = m.contract("MockERC20");

    const lending = m.contract("Lending", [tGPC.target.address, tUSDT.target.address]);

    return { tGPC, tUSDT, lending };
});
