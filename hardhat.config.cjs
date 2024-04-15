require("@nomicfoundation/hardhat-toolbox");
const ETHERSCAN_API_KEY = "K59NN9EJVCKEXZURVKN4EUXI51YS1UPXAI"
const INFURA_API_KEY = "ae1dff94b47a4b2a8500972cd7c86a05"
const SEPOLIA_PRIVATE_KEY = "e56ef7d27e9cadca176ec4ecef9e5b9627a38213e2005abe74fb4d5ab1012f94";


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  paths: {
    artifacts: './src/artifacts',
  },
  etherscan:{
    apiKey:[ETHERSCAN_API_KEY],
  },
  networks: {
    sepolia: {
      url:`https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    },
  }

};
