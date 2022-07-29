import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";



describe("Verify", function () {

  it("...", async function () {
    const signers = await ethers.getSigners()
    const signer = signers[0]
    
    console.log(await signer.getAddress())

    const id = "2"

    
    const messageHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(id))
    
    console.log("MESSAGE HASH: ", messageHash)

    const signedMessage = await signer.signMessage(messageHash)
    const sig = ethers.utils.splitSignature(signedMessage)

    console.log("Signed Message: ", signedMessage)
    console.log("Signature _vs: ", sig._vs)
    console.log("Signature compact: ", sig.compact)



    const contractFactory = await ethers.getContractFactory("VerifySignature")
    const contract = await contractFactory.deploy()
    await contract.deployed()

    const address = await contract.verify("2", signedMessage)

    console.log("RESULT ADDRESS: ", address)
  });
});
