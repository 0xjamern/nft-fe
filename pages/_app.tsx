import Head from "next/head";
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;

  return (
    <>
      <Head>
        <title>NFT Mint and Listing</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <ThirdwebProvider>
        <AnyComponent {...pageProps} />
      </ThirdwebProvider>
    </>
  );
}

export default MyApp;
