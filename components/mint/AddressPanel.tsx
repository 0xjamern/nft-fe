type Props = {
  address: string | undefined;
  isMismatched: boolean;
};

export const AddressPanel = ({ address, isMismatched }: Props) => {
  return (
    <>
      <hr className="my-2 border" />
      {address && (
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
