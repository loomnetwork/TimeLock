const { readFileSync } = require('fs')

const TimeLockFactory = artifacts.require("TimeLockFactory")

module.exports = function (deployer, network, accounts) {

  deployer.then(async () => {
    const tokenAddress = readFileSync('token_address', 'utf-8').toString().trim()
    await deployer.deploy(TimeLockFactory, tokenAddress)
    const TimeLockFactoryInstance = await TimeLockFactory.deployed()
    const creator = accounts[0]
    const netId = await web3.eth.net.getId()
    txHash = TimeLockFactory['networks'][netId].transactionHash
    let timelockTx = await web3.eth.getTransaction(txHash)

    console.log('\n*************************************************************************\n')
    console.log(`Creator: ${creator}`)
    console.log(`Token Address: ${tokenAddress}`)
    console.log(`TimeLockFactory Contract Address: ${TimeLockFactoryInstance.address}`)
    console.log(`TimeLockFactory Blk: ${timelockTx.blockNumber}`)
    console.log('\n*************************************************************************\n')
  })
}


