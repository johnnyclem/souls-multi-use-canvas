import React from 'react';
import { useBalance } from 'wagmi';
import { useQuery } from '@tanstack/react-query';

interface AgentWalletComponentProps {
  walletAddress: string;
}

interface NFT {
  id: string;
  name: string;
  image_url: string;
  collection: {
    name: string;
  };
}

const AgentWalletComponent: React.FC<AgentWalletComponentProps> = ({ walletAddress }) => {
  // Fetch ETH balance using wagmi
  const { data: balance, isFetching: isBalanceLoading } = useBalance({
    address: walletAddress as `0x${string}`,
    chainId: 1, // Ethereum mainnet
  });

  // Fetch NFTs from OpenSea API
  const fetchNFTs = async () => {
    const response = await fetch(
      `https://api.opensea.io/api/v1/assets?owner=${walletAddress}&limit=20`,
      {
        headers: {
          'X-API-KEY': process.env.REACT_APP_OPENSEA_API_KEY || '',
        },
      }
    );
    if (!response.ok) throw new Error('Failed to fetch NFTs');
    const data = await response.json();
    return data.assets || [];
  };

  const { data: nftData, isLoading: isNFTLoading, isError: isNFTError } = useQuery({
    queryKey: ['nfts', walletAddress],
    queryFn: fetchNFTs,
    enabled: !!walletAddress,
  });

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Agent Wallet</h1>

      {/* Wallet Address */}
      <div className="mb-4 p-3 bg-gray-700 rounded">
        <p className="text-gray-300">
          Address: <span className="font-mono">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
        </p>
      </div>

      {/* Balance Display */}
      <div className="mb-4 p-3 bg-gray-700 rounded">
        {isBalanceLoading ? (
          <p className="text-gray-400">Loading balance...</p>
        ) : balance ? (
          <p className="text-green-400">
            Balance: {balance.formatted} {balance.symbol}
          </p>
        ) : (
          <p className="text-red-400">Error loading balance</p>
        )}
      </div>

      {/* NFT Display */}
      <div>
        <h2 className="text-xl font-semibold mb-2">NFTs</h2>
        {isNFTLoading ? (
          <p className="text-gray-400">Loading NFTs...</p>
        ) : isNFTError ? (
          <p className="text-red-400">Error loading NFTs</p>
        ) : !nftData || nftData.length === 0 ? (
          <p className="text-gray-400">No NFTs found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {(nftData as NFT[]).map((nft) => (
              <div key={nft.id} className="bg-gray-700 rounded-lg overflow-hidden">
                <img
                  src={nft.image_url}
                  alt={nft.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3">
                  <p className="font-medium">{nft.name || 'Unnamed NFT'}</p>
                  <p className="text-sm text-gray-400">{nft.collection?.name || 'Unknown Collection'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentWalletComponent; 