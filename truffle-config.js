const { readFileSync } = require('fs')
const path = require('path')
const { join } = require('path')
const LoomTruffleProvider  = require ('loom-truffle-provider')
const HDWalletProvider = require('truffle-hdwallet-provider')
const { sha256 } = require ('js-sha256')
const { CryptoUtils } = require ('loom-js')
const { mnemonicToSeedSync } = require ('bip39')
const fs = require('fs')
const PrivateKeyProvider = require("truffle-privatekey-provider");

function getLoomProviderWithPrivateKey (privateKeyPath, chainId, writeUrl, readUrl) {
  const privateKey = readFileSync(privateKeyPath, 'utf-8')
  return new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)
}

function getLoomProviderWithMnemonic (mnemonicPath, chainId, writeUrl, readUrl) {
  const mnemonic = readFileSync(mnemonicPath, 'utf-8').toString().trim()
  const seed = mnemonicToSeedSync(mnemonic)
  const privateKeyUint8ArrayFromSeed = CryptoUtils.generatePrivateKeyFromSeed(new Uint8Array(sha256.array(seed)))
  const privateKeyB64 = CryptoUtils.Uint8ArrayToB64(privateKeyUint8ArrayFromSeed)
  return new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKeyB64)
}

module.exports = {
  contracts_build_directory: join(__dirname, './src/contracts'),
  compilers: {
    solc: {
      version: '0.4.24'
    }
  },
  networks: {
    rinkeby: {
      provider: function() {
        if (!process.env.INFURA_API_KEY) {
          throw new Error("INFURA_API_KEY env var not set")
        }
        const mnemonicPath = path.join(__dirname, 'rinkeby_mnemonic')
        const privateKeyPath = path.join(__dirname, 'rinkeby_private_key')
        if (fs.existsSync(privateKeyPath)) {
          const privateKey = readFileSync(path.join(__dirname, 'rinkeby_private_key'), 'utf-8')
          return new PrivateKeyProvider(privateKey, `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`, 0, 10)
        } else if (fs.existsSync(mnemonicPath)) {
          const mnemonic = readFileSync(path.join(__dirname, 'rinkeby_mnemonic'), 'utf-8')
          return new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`, 0, 10)
        }
      },
      network_id: 4,
      gasPrice: 15000000001,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
        version: "0.4.25"
    }
  }
}
