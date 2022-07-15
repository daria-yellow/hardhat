require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    testnet: {
      url: "https://speedy-nodes-nyc.moralis.io/ec6d522b56dbf79907d052e6/bsc/testnet",
      accounts: ["6e941d9cc851c002dd4fc51dd2c868c604b7985b1c75d74e1dd622b23a2b1244"]
    }
  }
};


// url: "https://ropsten.infura.io/v3/20c9877a100d45c28a1defbac4de68fc",
// accounts: ["6e941d9cc851c002dd4fc51dd2c868c604b7985b1c75d74e1dd622b23a2b1244"]