import React, { useEffect, useState } from "react";
import { useAddress, useNetworkMismatch, useSigner } from "@thirdweb-dev/react";

import { Loader } from "../components/common/Loader";
import { DropZone } from "../components/mint/DropZone";
import { LeftPanel } from "../components/mint/LeftPanel";
import { NameInput } from "../components/mint/NameInput";
import { MintHeader } from "../components/mint/MintHeader";
import { AddressPanel } from "../components/mint/AddressPanel";
import { AttributeRow } from "../components/mint/AttributeRow";

import { ImgPreview, AttributeType } from "../utils/types";
import { showNotification, NotificationType } from "../utils/notification";

import { getMintValue, getCurrentId, getNftName, mintNft } from "../utils/unft";

function mint() {
  const [loading, setLoading] = useState<boolean>(true);
  const [priceInEth, setPriceInEth] = useState<string>("");
  const [claimedSupply, setClaimedSupply] = useState<string>("0");
  const [collectionName, setCollectionName] = useState<string>("");

  const [nftName, setNftName] = useState<string>("");
  const [files, setFiles] = useState([] as ImgPreview[]);
  const [attributes, setAttributes] = useState([] as AttributeType[]);

  const signer = useSigner();
  const address = useAddress();
  const isMismatched = useNetworkMismatch();

  // auth
  useEffect(() => {
    const initValues = async () => {
      await initCurrentId();

      const mintValue: string = await getMintValue();
      setPriceInEth(mintValue);

      const nftCollectionName: string = await getNftName();
      setCollectionName(nftCollectionName);

      setLoading(false);
    };

    initValues();
  }, []);

  const initCurrentId = async (): Promise<void> => {
    const currentId: string = await getCurrentId();
    setClaimedSupply(currentId);
  };

  const minNft = async (): Promise<void> => {
    if (!address || !signer) return;

    if (isMismatched) {
      showNotification("You are on wrong network", NotificationType.ERROR);
      return;
    }

    if (nftName.length == 0) {
      showNotification("Insert NFT name", NotificationType.ERROR);
      return;
    }

    if (files.length == 0) {
      showNotification("Please select image", NotificationType.ERROR);
      return;
    }

    let attrError = "";
    let attributeObj = [];
    for (const attribute of attributes) {
      if (attribute.key.length == 0 || attribute.value.length == 0) {
        attrError = "Please insert all attributes";
        break;
      }

      attributeObj.push({
        traid_type: attribute.key,
        value: attribute.value,
      });
    }

    if (attrError.length > 0) {
      showNotification(attrError, NotificationType.ERROR);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", files[0].file, nftName);
    formData.append("nftName", nftName);
    formData.append("attributes", JSON.stringify(attributeObj));
    const res = await fetch("/api/pinata", {
      method: "POST",
      body: formData,
    });
    const ipfsHash = await res.text();

    const mintResult: string = await mintNft(signer, priceInEth, ipfsHash);
    if (mintResult.length > 0) {
      await initCurrentId();
      showNotification("Successfully minted", NotificationType.SUCCESS);
    } else {
      showNotification("Failed to mint", NotificationType.ERROR);
    }

    setLoading(false);
  };

  const updateAttribute = (ind: number) => {
    let newArr = [] as AttributeType[];
    for (let ii = 0; ii < attributes.length; ii++) {
      if (ii == ind) continue;
      newArr.push(attributes[ii]);
    }

    if (ind < 0) {
      newArr.push({
        key: "",
        value: "",
      });
    }

    setAttributes(newArr);
  };

  const setAttributeKey = (ind: number, keyVal: string) => {
    let newArr = [] as AttributeType[];
    for (let ii = 0; ii < attributes.length; ii++) {
      if (ii == ind) {
        newArr.push({
          key: keyVal,
          value: attributes[ii].value,
        });
      } else {
        newArr.push(attributes[ii]);
      }
    }

    setAttributes(newArr);
  };

  const setAttributeValue = (ind: number, ValueVal: string) => {
    let newArr = [] as AttributeType[];
    for (let ii = 0; ii < attributes.length; ii++) {
      if (ii == ind) {
        newArr.push({
          key: attributes[ii].key,
          value: ValueVal,
        });
      } else {
        newArr.push(attributes[ii]);
      }
    }

    setAttributes(newArr);
  };

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      <LeftPanel />

      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        {!loading && (
          <MintHeader
            collectionName={collectionName}
            claimedSupply={claimedSupply}
          />
        )}

        <AddressPanel
          loading={loading}
          isMismatched={isMismatched}
          address={address}
        />

        <div className="flex flex-1 flex-col items-center space-y-6 lg:justify-center lg:space-y-0">
          {loading ? (
            <Loader />
          ) : (
            <div className="border-b border-gray-900/10 pb-12 w-full">
              <NameInput nftName={nftName} setNftName={setNftName} />

              <DropZone files={files} setFiles={setFiles} />

              <AttributeRow
                attributes={attributes}
                setAttributeKey={setAttributeKey}
                setAttributeValue={setAttributeValue}
                updateAttribute={updateAttribute}
              />
            </div>
          )}
        </div>

        <button
          onClick={() => minNft()}
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
