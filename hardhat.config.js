require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// Unsafe MM Account
const PRIVATE_KEY = '72483587cdfc82a43cd770661f720c5c2e5bcc57324c7bf3749d3d6f78df81b1';

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: 'mumbai',
  networks: {
    hardhat: {},
    mumbai : {
      url: "https://polygon-mumbai.g.alchemy.com/v2/iJVVRCrmruzW0pHZ_QX5w0KFLOnWyk9O",
      accounts: [`${PRIVATE_KEY}`]
    }
  },
};
