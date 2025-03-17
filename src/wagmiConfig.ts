import { configureChains, createClient } from 'wagmi';
import { mainnet } from '@wagmi/core/chains';
import { publicProvider } from '@wagmi/core/providers/public';

const { chains, provider } = configureChains([mainnet], [publicProvider()]);

const client = createClient({
  autoConnect: false, // No auto-connect since we're using a fixed address
  connectors: [], // No connectors needed for agent-wallet address
  provider,
});

export { client, chains }; 