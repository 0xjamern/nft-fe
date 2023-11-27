import { useState } from "react";
import { useAddress, useNetworkMismatch } from "@thirdweb-dev/react";

import { NftModal } from "./NftModal";
import { ListItem } from "../list/ListItem";
import { NftDetail } from "../../utils/types";

type Props = {
  openTab: number;
  selTab: number;
  loading: boolean;
  search: string;
  nftList: NftDetail[];
};

export const ListPanel = ({
  openTab,
  selTab,
  loading,
  search,
  nftList,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [selItem, setNftItem] = useState<NftDetail | null>(null);

  const address = useAddress();
  const isMismatched = useNetworkMismatch();

  const showModal = (nftItem: NftDetail) => {
    setNftItem(nftItem);
    if (nftItem) setOpen(true);
  };

  let nftShowList = nftList;
  if (search.length > 0) {
    nftShowList = nftList.filter((nftItem: NftDetail) => {
      if (nftItem.name.includes(search) || nftItem.owner.includes(search))
        return true;

      let hasInclude = false;
      if (nftItem.attributes.length > 0) {
        for (const nftAttribute of nftItem.attributes) {
          if (
            nftAttribute.traid_type.includes(search) ||
            nftAttribute.value.includes(search)
          ) {
            hasInclude = true;
            break;
          }
        }
      }

      return hasInclude;
    });
  }

  return (
    <>
      <NftModal open={open} nftItem={selItem} setOpen={setOpen} />
      <div
        className={(openTab === selTab ? "block" : "hidden") + " text-center"}
      >
        {loading ? (
          <></>
        ) : selTab == 2 && (address == undefined || isMismatched) ? (
          <span className="inline-flex justify-center rounded-md bg-red-50 px-10 py-2 text-sm font-medium text-red-700 mt-5">
            Please connect wallet
          </span>
        ) : nftShowList.length == 0 ? (
          <span className="inline-flex justify-center rounded-md bg-red-50 px-10 py-2 text-sm font-medium text-red-700 mt-5">
            {selTab == 2 ? "You do not have any NFT" : "No minted NFT yet"}
          </span>
        ) : (
          <></>
        )}

        <div className="grid md:grid-cols-4 gap-4 md:content-stretch">
          {nftShowList.map((nftItem: NftDetail, ind: number) => (
            <ListItem key={ind} nftItem={nftItem} showModal={showModal} />
          ))}
        </div>
      </div>
    </>
  );
};
