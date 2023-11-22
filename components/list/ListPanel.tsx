import { ListItem } from "../list/ListItem";
import { NftDetail } from "../../utils/types";

type Props = {
  openTab: number;
  selTab: number;
  nftList: NftDetail[];
};

export const ListPanel = ({ openTab, selTab, nftList }: Props) => {
  return (
    <div className={openTab === selTab ? "block" : "hidden"} id="link1">
      <div className="grid grid-cols-3 gap-4 content-stretch">
        {nftList.map((nftItem: NftDetail, ind: number) => (
          <ListItem key={ind} nftItem={nftItem} />
        ))}
        {nftList.map((nftItem: NftDetail, ind: number) => (
          <ListItem key={ind} nftItem={nftItem} />
        ))}
        {nftList.map((nftItem: NftDetail, ind: number) => (
          <ListItem key={ind} nftItem={nftItem} />
        ))}
        {nftList.map((nftItem: NftDetail, ind: number) => (
          <ListItem key={ind} nftItem={nftItem} />
        ))}
        {nftList.map((nftItem: NftDetail, ind: number) => (
          <ListItem key={ind} nftItem={nftItem} />
        ))}
      </div>
    </div>
  );
};
