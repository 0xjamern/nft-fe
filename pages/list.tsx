import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { NftDetail } from "../utils/types";
import { ListItem } from "../components/ListItem";
import { getCurrentId, getTokenUri, formatUri, getOwner } from "../utils/unft";

function list() {
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [nftList, setNftList] = useState([] as NftDetail[]);

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
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-4 content-stretch">
          {/* <InfiniteScroll
        dataLength={nftList.length}
        next={() => setTimeout(() => fetchData(true), 500)}
        hasMore={loading}
        loader={
          <img
            className="h-80 w-80 object-contain"
            src="https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"
            alt=""
          />
        }
        scrollableTarget="__next"
      > */}
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
          {/* </InfiniteScroll> */}
        </div>
      </div>
    </div>
  );
}

export default list;
