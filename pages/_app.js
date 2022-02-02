import "../styles/globals.css";
import { Provider } from "react-redux";
import Store from "../Component/Store/Store";
import { SessionProvider } from "next-auth/react";
import { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Fragment>
      <Head>
        <title>Todo Web App</title>
        <meta
          name="description"
          content="ToDo Web App is a kind of web app that generally used to maintain our day-to-day tasks or list everything that we have to do"
        />
      </Head>
      <Provider store={Store}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </Provider>
    </Fragment>
  );
}

export default MyApp;
