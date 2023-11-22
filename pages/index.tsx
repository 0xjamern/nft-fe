import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNetworkMismatch,
  useSwitchChain,
  ChainId,
  useSigner,
} from "@thirdweb-dev/react";
import { useDropzone } from "react-dropzone";

import { LeftPanel } from "../components/mint/LeftPanel";
import { AddressPanel } from "../components/mint/AddressPanel";

import { ImgPreview, AttributeType } from "../utils/types";
import { showNotification, NotificationType } from "../utils/notification";
import { thumb, thumbInner, thumbsContainer, img } from "../utils/dropzone";
import { getMintValue, getCurrentId, getNftName, mintNft } from "../utils/unft";

function mint() {
  const [collectionName, setCollectionName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [priceInEth, setPriceInEth] = useState<string>("");
  const [claimedSupply, setClaimedSupply] = useState<string>("0");

  const [nftImg, setNftImg] = useState<string>("");
  const [nftName, setNftName] = useState<string>("");
  const [files, setFiles] = useState([] as ImgPreview[]);
  const [attributes, setAttributes] = useState([] as AttributeType[]);

  const signer = useSigner();
  const address = useAddress();
  const disconnect = useDisconnect();
  const switchChain = useSwitchChain();
  const connectWithMetamask = useMetamask();
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

  useEffect(() => {
    switchNetwork();
  }, [address]);

  const initCurrentId = async (): Promise<void> => {
    const currentId: string = await getCurrentId();
    setClaimedSupply(currentId);
  };

  const switchNetwork = async (): Promise<void> => {
    if (isMismatched) {
      try {
        await switchChain(ChainId.Goerli);
      } catch (err) {
        showNotification("You are on wrong network", NotificationType.ERROR);
      }
    }
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

    if (nftImg.length == 0) {
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

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles: File[]) => {
      setFiles(
        acceptedFiles.map(
          function (file: File): ImgPreview {
            return {
              file: file,
              preview: URL.createObjectURL(file),
            };
          }
          // Object.assign(file, {
          //   preview: URL.createObjectURL(file),
          // })
        )
      );

      const reader = new FileReader();
      reader.onload = () => {
        setNftImg(
          reader.result
            ? reader.result.toString().replace("data:image/jpeg;base64,", "")
            : ""
        );
      };
      reader.readAsDataURL(acceptedFiles[0]);
    },
  });

  const thumbs = files.map((file: ImgPreview) => (
    <div style={thumb} key={file.file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  // useEffect(() => {
  //   // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
  //   return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  // }, []);

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      <LeftPanel />

      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
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
        </header>

        <AddressPanel isMismatched={isMismatched} address={address} />

        <div className="flex flex-1 flex-col items-center space-y-6 lg:justify-center lg:space-y-0">
          {loading ? (
            <img
              className="h-80 w-80 object-contain"
              src="https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"
              alt=""
            />
          ) : (
            <div className="border-b border-gray-900/10 pb-12 w-full">
              <h2 className="text-center font-semibold leading-7 text-gray-900">
                NFT Info
              </h2>
              <p className="mt-1 text-sm text-center leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    NFT name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={nftName}
                      placeholder="NFT name"
                      onChange={(e) => setNftName(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Image
                  </label>
                  <div
                    {...getRootProps({
                      className:
                        "mt-2 flex justify-center dropzone cursor-pointer rounded-lg border border-dashed border-gray-900/25 px-6 py-10",
                    })}
                  >
                    <div className="text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="mt-4 text-sm leading-6 text-gray-600">
                        <input {...getInputProps()} />
                        <label className="relative rounded-md bg-white font-semibold text-indigo-600">
                          Drag & drop your image here, or click to select file
                        </label>
                        <div style={thumbsContainer}>{thumbs}</div>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <label className="mt-3 block text-sm font-medium leading-6 text-gray-900">
                Attributes
                <button
                  onClick={() => updateAttribute(-1)}
                  className="ml-2 rounded-full bg-blue-400 text-xs font-bold text-white lg:px-5 lg:text-base"
                >
                  Add
                </button>
              </label>
              {attributes.map((attribute, ind) => (
                <div
                  key={ind}
                  className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-7"
                >
                  <div className="sm:col-span-3">
                    <input
                      type="text"
                      value={attribute.key}
                      placeholder={"AttributeKey" + (ind + 1).toString()}
                      onChange={(e) => setAttributeKey(ind, e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <input
                      type="text"
                      value={attribute.value}
                      placeholder={"AttributeValue" + (ind + 1).toString()}
                      onChange={(e) => setAttributeValue(ind, e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="sm:col-span-1 text-center">
                    <button
                      onClick={() => updateAttribute(ind)}
                      className="mt-2 rounded-full bg-lime-400 text-xs font-bold text-white lg:px-5 lg:text-base"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={minNft}
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
