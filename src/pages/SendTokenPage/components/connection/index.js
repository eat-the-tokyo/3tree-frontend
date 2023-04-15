import { Network } from "@web3-react/network";
import {initializeConnector} from '@web3-react/core'
import { WalletConnect } from "@web3-react/walletconnect";

const RPC_PROVIDERS = "";
const RPC_URLS = "";

function onError(error) {
  console.debug(`web3-react error: ${error}`);
}

export const ConnectionType = {
  INJECTED: "INJECTED",
  COINBASE_WALLET: "COINBASE_WALLET",
  WALLET_CONNECT: "WALLET_CONNECT",
  NETWORK: "NETWORK",
  GNOSIS_SAFE: "GNOSIS_SAFE",
};

const [web3Network, web3NetworkHooks] = initializeConnector(
  (actions) =>
    new Network({ actions, urlMap: RPC_PROVIDERS, defaultChainId: 1 })
);

const [web3WalletConnect, web3WalletConnectHooks] = (actions) => {
  const RPC_URLS_WITHOUT_FALLBACKS = Object.entries(RPC_URLS).reduce(
    (map, [chainId, urls]) => ({
      ...map,
      [chainId]: urls[0],
    }),
    {}
  );
  return new WalletConnect({
    actions,
    options: {
      rpc: RPC_URLS_WITHOUT_FALLBACKS,
      qrcode: true,
    },
    onError,
  });
};
export const networkConnection = {
  connector: web3Network,
  hooks: web3NetworkHooks,
  type: ConnectionType.NETWORK,
};

export const walletConnectConnection = {
  connector: web3WalletConnect,
  hooks: web3WalletConnectHooks,
  type: ConnectionType.WALLET_CONNECT,
};
