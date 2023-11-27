import { useState } from "react";
import { TabHeader } from "../../components/list/TabHeader";
import { ListPanel } from "../../components/list/ListPanel";

import { NftDetail } from "../../utils/types";

type Props = {
  openTab: number;
  loading: boolean;
  nftList: NftDetail[];
  mineList: NftDetail[];
  setOpenTab: (id: number) => void;
};

const nameArr = ["All NFT", "My NFT"];

export const TabContent = ({
  openTab,
  loading,
  nftList,
  mineList,
  setOpenTab,
}: Props) => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-wrap">
      <div className="w-full">
        <input
          type="text"
          value={search}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setSearch(e.target.value)}
        />
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
            <ListPanel
              loading={loading}
              openTab={openTab}
              selTab={1}
              search={search}
              nftList={nftList}
            />
            <ListPanel
              loading={loading}
              openTab={openTab}
              selTab={2}
              search={search}
              nftList={mineList}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
