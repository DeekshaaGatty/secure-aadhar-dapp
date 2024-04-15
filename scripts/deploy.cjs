// deploy.js

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const AadharNFT = await ethers.getContractFactory("AadharNFT");
  const aadharNFT = await AadharNFT.deploy();

  console.log("AadharNFT address:", aadharNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
