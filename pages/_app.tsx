import Head from "next/head";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import {
  ThirdwebProvider,
  ChainId,
  embeddedWallet,
  metamaskWallet,
} from "@thirdweb-dev/react";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Simple NFT mint frontend" />

        <title>NFT Mint and Listing</title>
        <link rel="icon" href="/favicon.ico"></link>
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
      </Head>
      <ToastContainer
        position="top-right"
        closeOnClick
        hideProgressBar={false}
      />
      <ThirdwebProvider
        activeChain={ChainId.Goerli}
        supportedWallets={[embeddedWallet(), metamaskWallet()]}
        clientId={process.env.NEXT_PUBLIC_THIRDWEB_PROJECT_ID}
      >
        <AnyComponent {...pageProps} />
      </ThirdwebProvider>
    </>
  );
}

export default MyApp;
