export const LeftPanel = () => {
  return (
    <div className="lg:col-span-4 bg-gradient-to-br from-cyan-800 to-rose-500">
      <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
        <div className="rounded-xl p-2">
          <img
            className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
            src="/unikura.jpg"
            alt="unikura"
          />
        </div>
        <div className="p-5 space-y-2 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Mint Your NFT</h1>
          <a href="/list">
            <span className="text-2xl font-bold text-white">Show List</span>
          </a>
        </div>
      </div>
    </div>
  );
};
