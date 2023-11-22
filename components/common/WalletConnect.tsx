import React, { useEffect } from "react";
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNetworkMismatch,
  useSwitchChain,
  ChainId,
} from "@thirdweb-dev/react";

import { showNotification, NotificationType } from "../../utils/notification";

export const WalletConnect = () => {
  const address = useAddress();
  const disconnect = useDisconnect();
  const switchChain = useSwitchChain();
  const connectWithMetamask = useMetamask();
  const isMismatched = useNetworkMismatch();

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

  return (
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
  );
};
