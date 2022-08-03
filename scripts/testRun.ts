import { BigNumber } from "ethers";
import { ethers } from "hardhat";

async function main() {

    const signers = await ethers.getSigners()
    const signer = signers[0]
    
    console.log("SIGNER ADDRESS: ", signer.address)

    const tokenId = 2

    const message = `${tokenId}`

    console.log(`id: ${tokenId}`)
    console.log(`signer address: ${signer.address}`)
    console.log("message to sign: ", message)

    const signature = await signer.signMessage(message)

    console.log(`QR CODE DATA: ${tokenId}-${signer.address}-${signature}`)



    const contractFactory = await ethers.getContractFactory("VerifySignature")
    const contract = await contractFactory.deploy()
    await contract.deployed()

    const result = await contract.verifyTicket(tokenId, signer.address, signature)

    console.log("RESULT: ", result)



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});