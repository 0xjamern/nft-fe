import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNetworkMismatch,
  useSwitchChain,
  ChainId,
} from "@thirdweb-dev/react";

import { showNotification, NotificationType } from "../utils/notification";
import { getMintValue, getCurrentId, getNftName } from "../utils/unft";

function mint() {
  const [nftName, setNftName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [priceInEth, setPriceInEth] = useState<string>("");
  const [claimedSupply, setClaimedSupply] = useState<string>("0");

  const address = useAddress();
  const disconnect = useDisconnect();
  const switchChain = useSwitchChain();
  const connectWithMetamask = useMetamask();
  const isMismatched = useNetworkMismatch();

  // auth
  useEffect(() => {
    const initValues = async () => {
      const mintValue: string = await getMintValue();
      setPriceInEth(mintValue);

      const currentId: string = await getCurrentId();
      setClaimedSupply(currentId);

      const nftName: string = await getNftName();
      setNftName(nftName);

      setLoading(false);
    };

    initValues();
  }, []);

  useEffect(() => {
    switchNetwork();
  }, [address]);

  const switchNetwork = async (): Promise<void> => {
    if (isMismatched) {
      try {
        await switchChain(ChainId.Goerli);
      } catch (err) {
        showNotification("You are on wrong network", NotificationType.ERROR);
      }
    }
  };

  const minNft = (): void => {
    if (!address) return;

    if (isMismatched) {
      showNotification("You are on wrong network", NotificationType.ERROR);
      return;
    }

    setLoading(true);

    // nftDrop
    //   .claimTo(address, quantity)
    //   .then(async (tx) => {
    //     const receipt = tx[0].receipt; // the transaction receipt
    //     const claimedTokenId = tx[0].id; // the id of the NFT you claimed
    //     const claimedNFT = await tx[0].data(); // (optional) get the claimed NFT metadata

    //     showNotification("You have Successfully Minted", NotificationType.SUCCESS);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     showNotification("Something went wrong!", NotificationType.ERROR);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //     toast.dismiss(notification);
    //   });
  };

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      <div className="lg:col-span-4 bg-gradient-to-br from-cyan-800 to-rose-500">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="rounded-xl bg-gradient-to-br from-yellow-400 to-purple-600 p-2">
            <img
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
              src="/unikura.jpg"
              alt="unikura"
            />
          </div>
          <div className="p-5 space-y-2 text-center">
            <h1 className="text-4xl font-bold text-white">Mint Your NFT</h1>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        <header className="flex items-center justify-between">
          <Link href="https://unikura.xyz" target="_blank">
            <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80">
              The{" "}
              <span className="font-extrabold underline decoration-pink-600/50">
                NFT
              </span>{" "}
              MINT APP
            </h1>
          </Link>
          <button
            onClick={() =>
              address
                ? isMismatched
                  ? switchNetwork()
                  : disconnect()
                : connectWithMetamask()
            }
            className="rounded-full bg-rose-400 px-4 py-2 text-xs font-bold text-white lg:px-5 lg:py-3 lg:text-base"
          >
            {address
              ? isMismatched
                ? "Switch Network"
                : "Disconnect Wallet"
              : "Connect Wallet"}
          </button>
        </header>

        <hr className="my-2 border" />
        {address && (
          <p className="text-center text-sm text-rose-400">
            {isMismatched ? (
              <>You are on wrong network, Please switch to Goerli network</>
            ) : (
              <>
                You're logged in with wallet {address.substring(0, 4)}
                ...
                {address.substring(address.length - 4)}
              </>
            )}
          </p>
        )}

        <div className="flex flex-1 flex-col items-center space-y-6 text-center lg:justify-center lg:space-y-0">
          <img
            className="w-80 object-cover pb-10 lg:h-40"
            src="/ownership.jpg"
            alt="ownership"
          />

          <h1 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">
            {nftName}
          </h1>

          {loading ? (
            <p className="animate-pulse pt-2 text-xl text-green-500">
              Loading Mint Count...
            </p>
          ) : (
            <p className="pt-2 text-xl text-green-500">
              {claimedSupply} NFT's minted
            </p>
          )}

          {loading && (
            <img
              className="h-80 w-80 object-contain"
              src="https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"
              alt=""
            />
          )}
        </div>

        <button
          onClick={minNft}
          disabled={loading || !address || isMismatched}
          className="mt-10 h-16 w-full rounded-full bg-red-600 text-white font-bold disabled:bg-gray-400"
        >
          {loading ? (
            <>Loading</>
          ) : !address ? (
            <>Connect wallet to mint NFT</>
          ) : isMismatched ? (
            <>Switch to Goerli network</>
          ) : (
            <span className="font-bold">Mint NFT ({priceInEth} ETH)</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default mint;
