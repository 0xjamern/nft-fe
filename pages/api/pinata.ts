import fs from "fs";
import pinataSDK from "@pinata/sdk";
import { IncomingForm } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";

const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });

export const config = {
  api: {
    bodyParser: false,
  },
};

const saveFile = async (file: any) => {
  try {
    const stream = fs.createReadStream(file.filepath);
    const options = {
      pinataMetadata: {
        name: file.originalFilename,
      },
    };
    const response = await pinata.pinFileToIPFS(stream, options);
    fs.unlinkSync(file.filepath);

    return response;
  } catch (error) {
    throw error;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const form = new IncomingForm();
      form.parse(req, async function (err: any, fields: any, files: any) {
        if (err) {
          console.log({ err });
          return res.status(500).send("Upload Error");
        }

        if (files.file.length == 0)
          return res.status(500).send("No file attached");
        else {
          const imgResponse = await saveFile(files.file[0]);
          const { IpfsHash } = imgResponse;

          const json = {
            image: process.env.PINATA_BASE_URL + IpfsHash,
            name: fields.nftName[0],
            attributes: JSON.parse(fields.attributes[0]),
          };
          const jsonResponse = await pinata.pinJSONToIPFS(json);
          const { IpfsHash: jsonHash } = jsonResponse;

          res.status(200).send(process.env.PINATA_BASE_URL + jsonHash);
        }
      });
    } catch (e) {
      console.log(e);
      res.status(500).send("Server Error");
    }
  } else if (req.method === "GET") {
    try {
      const response = await pinata.pinList({
        pageLimit: 10,
      });
      res.status(200).json(response.rows[0]);
    } catch (e) {
      console.log(e);
      res.status(500).send("Server Error");
    }
  }
}
