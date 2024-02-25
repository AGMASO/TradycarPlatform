const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect, assert } = require("chai");
const hre = require("hardhat");

describe("TradifyPlatform", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  async function deployContractAndSetVariables() {
    //Esta primera Function nos sirve como Setup, y luego usaremos loadFixture() para
    // reusar este setup para cada test.

    const tradifyPlatform = await hre.ethers.deployContract(
      "TradifyPlatform",
      []
    );

    await tradifyPlatform.waitForDeployment();

    //!Take the first element of the array and assign it to the variable owner
    const owner = await hre.ethers.getSigner(0);
    console.log("estos son los signers" + owner);

    console.log("Signer 1 address: ", owner.address);

    return { faucet, owner, withdrawAmount, notOwner };
  }

  it("should deploy and set the owner correctly", async function () {
    const { bmw_3er, owner } = await loadFixture(deployContractAndSetVariables);

    expect(await faucet.owner()).to.equal(owner.address);
  });

  it("Should revert when the amount to withdraw is more that accepted", async function () {
    const { faucet, owner, withdrawAmount } = await loadFixture(
      deployContractAndSetVariables
    );

    await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
  });
  it("WithdrawAll should be called only from owner", async function () {
    const { faucet, owner, notOwner, withdrawAmount } = await loadFixture(
      deployContractAndSetVariables
    );
    //!CON CONNECT DE BASECONTRACT, ESTAMOS CONECTANDO A LA INSTANCE DEL CONTRATO CREADO
    //! CON OTRO RUNNER, PERFECTO PARA EJECUTAR fn CON OTRO MSG.SENDER

    await expect(faucet.connect(notOwner).withdrawAll()).to.be.reverted;
    const balanceSCBefore = await hre.ethers.provider.getBalance(faucet.target);
    const balanceOwnerBefore = await hre.ethers.provider.getBalance(
      owner.address
    );

    await faucet.withdrawAll();

    const balanceOwnerAfter = await hre.ethers.provider.getBalance(
      owner.address
    );

    expect(await hre.ethers.provider.getBalance(faucet.target)).to.equal(0);
  });

  it("detroyFaucet() should kill the bytecode of the contract", async function () {
    const { faucet, owner, notOwner, withdrawAmount } = await loadFixture(
      deployContractAndSetVariables
    );

    await expect(faucet.connect(notOwner).destroyFaucet()).to.be.reverted;
    await faucet.destroyFaucet();
    expect(await hre.ethers.provider.getCode(faucet.target)).to.equal("0x");
  });
});
