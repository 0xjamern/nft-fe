import Head from "next/head";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;

  return (
    <>
      <Head>
        <title>NFT Mint and Listing</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <ToastContainer
        position="top-right"
        closeOnClick
        hideProgressBar={false}
      />
      <ThirdwebProvider
        activeChain={ChainId.Goerli}
        clientId={process.env.NEXT_PUBLIC_THIRDWEB_PROJECT_ID}
      >
        <AnyComponent {...pageProps} />
      </ThirdwebProvider>
    </>
  );
}

export default MyApp;
