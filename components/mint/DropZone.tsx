import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

import { ImgPreview } from "../../utils/types";
import { thumb, thumbInner, thumbsContainer, img } from "../../utils/dropzone";

type Props = {
  files: ImgPreview[];
  setFiles: (files: ImgPreview[]) => void;
};

export const DropZone = ({ files, setFiles }: Props) => {
  const [nftImg, setNftImg] = useState<string>("");

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

  return (
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
  );
};
