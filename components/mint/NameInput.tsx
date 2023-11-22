type Props = {
  nftName: string;
  setNftName: (name: string) => void;
};

export const NameInput = ({ nftName, setNftName }: Props) => {
  return (
    <>
      <h2 className="text-center font-semibold leading-7 text-gray-900">
        NFT Info
      </h2>
      <p className="mt-1 text-sm text-center leading-6 text-gray-600">
        This information will be displayed publicly so be careful what you
        share.
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
    </>
  );
};
