# 🌐 DID Driver for NEAR

This project implements a [Decentralized Identifier (DID)](https://www.w3.org/TR/did-core/) driver for the NEAR blockchain, enabling interaction with smart contracts that manage DID registries.

---

## 🚀 Getting Started

To start the local server, run:

```bash
npm run start
```

---

## 🛠 Build and Test

### 🔧 Build the project

```bash
npm run build
```

Generates a production-ready bundle.

### 🐳 Build Docker image

```bash
docker build . -t driver-did-near
```

Builds a Docker image named `driver-did-near`.

### ▶️ Run the container

```bash
docker run -p 8080:8000 \
  -e CONTRACT_ID=[YOUR_NEAR_CONTRACT_ADDRESS] \
  -e RPC_URL=[YOUR_NEAR_RPC_URL] \
  -e NETWORK_ID=[YOUR_NEAR_NETWORK_ID] \
  -d driver-did-near
```

> Make sure to replace the environment variable values with your actual configuration.

---

## ⚙️ Environment Variables

The `driver-did-near` service accepts the following environment variables:

| Key         | Description                                                                 | Default                      | Notes                                                  |
|-------------|-----------------------------------------------------------------------------|------------------------------|--------------------------------------------------------|
| `CONTRACT_ID` | The on-chain address (account ID) of the smart contract that manages DIDs. | *(mandatory)*                | Refers to your `did:near` registry smart contract.     |
| `RPC_URL`     | The JSON-RPC endpoint used to interact with the NEAR blockchain.           | `https://rpc.testnet.near.org` | Use a different RPC for `mainnet` or other networks.  |
| `NETWORK_ID`  | Identifier for the NEAR network to connect to.                             | `testnet`                    | Valid values: `testnet`, `mainnet`.                    |

---

## 📄 License

MIT — feel free to use and adapt.

---

## 🧠 About

This driver is compatible with the [DID Core Specification](https://www.w3.org/TR/did-core/) and can be integrated into DID resolvers or other decentralized identity frameworks.
