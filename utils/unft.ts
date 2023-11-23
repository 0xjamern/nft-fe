import { Contract, Signer, providers, utils } from "ethers";

import { CONTRACTS, RPC_URL } from "../utils/const";
import UNftAbi from "../abis/unft.json";

const provider = new providers.JsonRpcProvider(RPC_URL);
const UNftContract = new Contract(CONTRACTS.UNFT, UNftAbi, provider);

// get required ETH value to mint
export const getMintValue = async (): Promise<string> => {
  const mintValue = await UNftContract.mintValue();
  return utils.formatEther(mintValue);
};

// to fetch minted nft
export const getCurrentId = async (): Promise<string> => {
  const currentId = await UNftContract.getCurrentId();
  return currentId.toString();
};

// to fetch nft collection name
export const getNftName = async (): Promise<string> => {
  const nftName = await UNftContract.name();
  return nftName.toString();
};

// this function was added as of wrong uri set in contract
export const formatUri = (uri: string): string => {
  return uri.includes("/ipfs/")
    ? uri
    : uri.replace(
        "https://aquamarine-worthwhile-reindeer-880.mypinata.cloud/",
        "https://aquamarine-worthwhile-reindeer-880.mypinata.cloud/ipfs/"
      );
};

// to get tokenUri from the tokenId
export const getTokenUri = async (tokenId: number): Promise<string> => {
  const tokenUri = (await UNftContract.tokenURI(tokenId)).toString();
  return formatUri(tokenUri);
};

// get owner address of certain tokenId
export const getOwner = async (tokenId: number): Promise<string> => {
  const owner = await UNftContract.ownerOf(tokenId);
  return owner;
};

// function to mint the NFT
export const mintNft = async (
  signer: Signer,
  valueAmt: string,
  uri: string
): Promise<string> => {
  try {
    const tx = await UNftContract.connect(signer).mint(uri, {
      value: utils.parseEther(valueAmt),
    });
    if (tx) {
      await tx.wait();
      return tx.hash;
    }
  } catch (err) {
    console.log(err);
  }

  return "";
};
