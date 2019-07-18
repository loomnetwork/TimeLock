# TimeLock


Follow these steps to deploy the `TimeLockFactory` smart contract:

1. Install dependencies

```bash
yarn install
```

2. Create a new file called "token_address" and paste into it your token's address

3. If you want to deploy to extdev, save your private key/mnemonic to a file called  `extdev_private_key`/`extdev_mnemonic`. For mainnet, use `mainnet_private_key`/`mainnet_mnemonic` instead.

4. Compile the smart contract

```bash
truffle compile
```

5. Deploy

```bash
truffle deploy --network extdev_plasma_us1
```



