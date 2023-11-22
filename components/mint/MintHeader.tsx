import Link from "next/link";

import { WalletConnect } from "../common/WalletConnect";

type Props = {
  collectionName: string;
  claimedSupply: string;
};

export const MintHeader = ({ collectionName, claimedSupply }: Props) => {
  return (
    <header className="flex items-center justify-between">
      <Link href="https://unikura.xyz" target="_blank">
        <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80">
          <span className="font-extrabold underline decoration-pink-600/50">
            {collectionName}
          </span>{" "}
          Mint Page
        </h1>
        (
        <span className="pt-2 text-green-500">
          {claimedSupply} NFT's minted
        </span>
        )
      </Link>

      <WalletConnect />
    </header>
  );
};
