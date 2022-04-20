import {
  useMetamask,
  useWalletConnect,
  useCoinbaseWallet,
  useNetwork,
  useAddress,
  useDisconnect,
  useNFTCollection,
} from '@thirdweb-dev/react';
import datos from "@thirdweb-dev/react"
import { useEffect, useState } from 'react';

export default function Home() {
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const disconnectWallet = useDisconnect();
  const address = useAddress();
  const network = useNetwork();
  const nftCollectionAddress = "0xE0d8D7b8273De14e628d2F2A4a10f719F898450A";
  const nftCollection = useNFTCollection(nftCollectionAddress);
  const [nfts, setNfts] = useState([]);

  // If a wallet is connected, show address, chainId and disconnect button
  console.log(nfts);
  useEffect(() => {
    console.log(nftCollection)
    if (nftCollection) {

      // call functions on your contract
      nftCollection
        .getAll()
        .then((nfts) => {
          setNfts(nfts);
        })
        .catch((error) => {
          console.error("failed to fetch nfts", error);
        });
    }
  }, [nftCollection]);

  if (address) {
    console.log(address)
    console.log(network[0])
    console.log(connectWithMetamask)
    return (
      <div>
        Address: {address}
        <br />
        Chain ID: {network[0].data.chain && network[0].data.chain.id}
        <br />
        <button onClick={disconnectWallet}>Disconnect</button>
        <ul>
      {nfts.map((nft) => (
        <li key={nft.metadata.id.toString()}>{nft.metadata.name}</li>
      ))}
        </ul>
        peep
      </div>
    );
  }

  // If no wallet is connected, show connect wallet options
  return (
    <div>
      <button onClick={() => connectWithCoinbaseWallet()}>
        Connect Coinbase Wallet
      </button>
      <button onClick={() => connectWithMetamask()}>Connect MetaMask</button>
      <button onClick={() => connectWithWalletConnect()}>
        Connect WalletConnect
      </button>
    </div>
  );
}
