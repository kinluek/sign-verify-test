import { BigNumber } from "ethers";
import { ethers } from "hardhat";

async function main() {

    const signers = await ethers.getSigners()
    const signer = signers[0]
    
    console.log("SIGNER ADDRESS: ", signer.address)

    const id = 2



    const message = `${id}-${signer.address}`

    console.log(`id: ${id}`)
    console.log(`signer address: ${signer.address}`)
    console.log("message to sign: ", message)

    const signature = await signer.signMessage(message)



    const contractFactory = await ethers.getContractFactory("VerifySignature")
    const contract = await contractFactory.deploy()
    await contract.deployed()

    const result1 = await contract.verifyString(message, signature)

    console.log("RESULT ADDRESS 1: ", result1)

    const result2 = await contract.verifyTicket(id, signer.address, signature)

    console.log("RESULT ADDRESS 2: ", result2)

    const equal = await contract.compare(`${id}-${signer.address}`, id, signer.address)

    console.log("EQUAL: ", equal)


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});