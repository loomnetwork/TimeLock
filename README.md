# TimeLock


Follow these steps to deploy the `TimeLockFactory` smart contract:

1. Install dependencies

```bash
yarn install
```

2. Create a new file called "token_address" and paste into it your token's address

3. If you want to deploy to Rinkeby, save your private key/mnemonic to a file called  `rinkeby_private_key`/`rinkeby_mnemonic`.

4. Compile the smart contract

```bash
truffle compile
```

5. Export your Infura API KEY

export INFURA_API_KEY=YOUR INFURA API KEY

5. Deploy

```bash
truffle deploy --network rinkeby
```



