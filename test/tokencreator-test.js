const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenCreator", function () {
  it("IT Token Creator", async function () {

    const TokenCreator = await ethers.getContractFactory("TokenCreator");
    const tokenCreator = await TokenCreator.deploy("Token Test", "TOKTEST", 100000);
    await tokenCreator.deployed();

    expect(await tokenCreator.name()).to.equal("Token Test");
    expect(await tokenCreator.symbol()).to.equal("TOKTEST");

  });
});
