import { Contract, Signer, providers, utils } from "ethers";

import { CONTRACTS, RPC_URL } from "../utils/const";
import UNftAbi from "../abis/unft.json";

const provider = new providers.JsonRpcProvider(RPC_URL);
const UNftContract = new Contract(CONTRACTS.UNFT, UNftAbi, provider);

export const getMintValue = async (): Promise<string> => {
  const mintValue = await UNftContract.mintValue();
  return utils.formatEther(mintValue);
};

export const getCurrentId = async (): Promise<string> => {
  const currentId = await UNftContract.getCurrentId();
  return currentId.toString();
};

export const getNftName = async (): Promise<string> => {
  const nftName = await UNftContract.name();
  return nftName.toString();
};

export const formatUri = (uri: string): string => {
  return uri.includes("/ipfs/")
    ? uri
    : uri.replace(
        "https://aquamarine-worthwhile-reindeer-880.mypinata.cloud/",
        "https://aquamarine-worthwhile-reindeer-880.mypinata.cloud/ipfs/"
      );
};

export const getTokenUri = async (tokenId: number): Promise<string> => {
  const tokenUri = (await UNftContract.tokenURI(tokenId)).toString();
  return formatUri(tokenUri);
};

export const getOwner = async (tokenId: number): Promise<string> => {
  const owner = await UNftContract.ownerOf(tokenId);
  return owner;
};

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
