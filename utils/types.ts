export interface ImgPreview {
  file: File;
  preview: string;
}

export interface AttributeType {
  key: string;
  value: string;
}

export interface NftDetail {
  id: string;
  image: string;
  name: string;
  owner: string;
  attributes: AttributeType[];
}
