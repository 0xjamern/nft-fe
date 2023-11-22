type Props = {
  address: string | undefined;
  loading: boolean;
  isMismatched: boolean;
};

export const AddressPanel = ({ address, loading, isMismatched }: Props) => {
  return (
    <>
      <hr className="my-2 border" />
      {address && !loading && (
        <p className="text-center text-sm text-rose-400">
          {isMismatched ? (
            <>You are on wrong network, Please switch to Goerli network</>
          ) : (
            <>
              You're logged in with wallet {address.substring(0, 4)}
              ...
              {address.substring(address.length - 4)}
            </>
          )}
        </p>
      )}
    </>
  );
};
