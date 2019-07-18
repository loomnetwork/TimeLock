const { readFileSync } = require('fs')
const path = require('path')
const { join } = require('path')
const HDWalletProvider = require('truffle-hdwallet-provider')
const fs = require('fs')
const PrivateKeyProvider = require("truffle-privatekey-provider");


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
    },
    mainnet: {
      provider: function() {
        if (!process.env.INFURA_API_KEY) {
          throw new Error("INFURA_API_KEY env var not set")
        }
        const mnemonicPath = path.join(__dirname, 'mainnet_mnemonic')
        const privateKeyPath = path.join(__dirname, 'mainnet_private_key')
        if (fs.existsSync(privateKeyPath)) {
          const privateKey = readFileSync(path.join(__dirname, 'mainnet_private_key'), 'utf-8')
          return new PrivateKeyProvider(privateKey, `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`, 0, 10)
        } else if (fs.existsSync(mnemonicPath)) {
          const mnemonic = readFileSync(path.join(__dirname, 'mainnet_mnemonic'), 'utf-8')
          return new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`, 0, 10)
        }
      },
      network_id: 1,
      skipDryRun: true
    }
  },
  solc: {
    optimizer: {
        enabled: true,
        runs: 200
    }
  },
  compilers: {
    solc: {
        version: "0.4.25"
    }
  }
}
