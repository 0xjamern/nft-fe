import { TabHeader } from "../../components/list/TabHeader";
import { ListPanel } from "../../components/list/ListPanel";

import { NftDetail } from "../../utils/types";

type Props = {
  openTab: number;
  setOpenTab: (id: number) => void;
  nftList: NftDetail[];
  mineList: NftDetail[];
};

const nameArr = ["All NFT", "My NFT"];

export const TabContent = ({
  openTab,
  setOpenTab,
  nftList,
  mineList,
}: Props) => {
  return (
    <div className="flex flex-wrap">
      <div className="w-full">
        <ul
          className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
          role="tablist"
        >
          {[1, 2].map((ind: number) => (
            <TabHeader
              key={ind}
              openTab={openTab}
              selTab={ind}
              tabLabel={nameArr[ind - 1]}
              setOpenTab={setOpenTab}
            />
          ))}
        </ul>
        <div className="relative flex flex-col min-w-0 w-full mb-6">
          <div className="tab-content tab-space">
            <ListPanel openTab={openTab} selTab={1} nftList={nftList} />
            <ListPanel openTab={openTab} selTab={2} nftList={mineList} />
          </div>
        </div>
      </div>
    </div>
  );
};
