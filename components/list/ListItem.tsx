import { useState } from "react";
import { NftDetail } from "../../utils/types";

type Props = {
  nftItem: NftDetail;
};

export const ListItem = ({ nftItem }: Props) => {
  return nftItem ? (
    <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div className="relative inline-block align-bottom">
        <div className="relative overflow-hidden bg-cover bg-no-repeat">
          <img className="rounded-t-lg" src={nftItem.image} alt="" />
          <a>
            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
          </a>
        </div>
        <div className="absolute left-0 top-0 overflow-hidden w-full h-full pointer-events-none"></div>
      </div>
      <div className="p-4">
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {`#${nftItem.id} - ${nftItem.name}`}
        </h5>
        <div className="relative inline-block align-bottom">
          <button
            type="button"
            className="inline-block rounded bg-blue-400	 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Show Details
          </button>
          <div className="absolute left-0 top-0 overflow-hidden w-full h-full pointer-events-none"></div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
