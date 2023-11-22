import React, { useEffect, useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";

import { Spinner } from "../components/common/Spinner";
import { ListHeader } from "../components/list/ListHeader";
import { TabContent } from "../components/list/TabContent";

import { NftDetail } from "../utils/types";
import { getCurrentId, getTokenUri, formatUri, getOwner } from "../utils/unft";

function list() {
  const [loading, setLoading] = useState(true);
  const [basicActive, setBasicActive] = useState("tab1");
  const [nftList, setNftList] = useState([] as NftDetail[]);
  const [mineList, setMineList] = useState([] as NftDetail[]);

  const [openTab, setOpenTab] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (flag: boolean = false) => {
    const currentId = Number(await getCurrentId());
    if (currentId > 0) {
      const idList = Array.from({ length: currentId }, (_, i) => i + 1);
      const nftArr = await Promise.all(
        idList.map(async (tokenId: number) => {
          const tokenUri = await getTokenUri(tokenId);
          const owner = await getOwner(tokenId);

          const metaResp = await fetch(tokenUri);
          const metaInfo = await metaResp.json();
          return {
            owner,
            id: tokenId.toString(),
            image: formatUri(metaInfo.image),
            name: metaInfo.name,
            attributes: metaInfo.attributes ? metaInfo.attributes : [],
          };
        })
      );

      setNftList(nftArr);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-800 to-rose-500">
      <ListHeader />

      <div className="container mx-auto px-4 pt-10">
        <Spinner visible={loading} />
        <TabContent
          openTab={openTab}
          setOpenTab={setOpenTab}
          nftList={nftList}
          mineList={mineList}
        />
      </div>
    </div>
  );
}

export default list;
