import { connectorsForWallets, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { ledgerWallet } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient } from 'wagmi';
import { goerli, mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, ...(import.meta.env?.MODE === 'development' ? [goerli] : [])],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: 'My wagmi + RainbowKit App',
  chains,
});
const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [ledgerWallet({ chains })],
  },
]);

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export { chains };
