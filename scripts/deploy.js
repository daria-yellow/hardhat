// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require('fs');
const path = require('path');


async function main() {

  const My = await hre.ethers.getContractFactory("MyToken");
  const my = await My.deploy();

  await my.deployed();

  console.log("MyToken deployed to:", my.address);

  saveFrontendFiles({
    MyToken: my
  })

}

function saveFrontendFiles(contracts) {
  const contractsDir = path.join(__dirname, '/..', 'front/contracts')

  if(!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir)
  }

  Object.entries(contracts).forEach((contract_item) => {
    const [name, contract] = contract_item

    if(contract) {
      fs.writeFileSync(
        path.join(contractsDir, '/', name + '-contract-address.json'),
        JSON.stringify({[name]: contract.address}, undefined, 2)
      )
    }

    const ContractArtifact = hre.artifacts.readArtifactSync(name)

    fs.writeFileSync(
      path.join(contractsDir, '/', name + ".json"),
      JSON.stringify(ContractArtifact, null, 2)
    )
  })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
