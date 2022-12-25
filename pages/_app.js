import '../styles/globals.css'
import { AppProps } from 'next/app'
import "../styles/globals.css";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import { SessionProvider } from "next-auth/react"

const progress = new ProgressBar({
  size: 4,
  color: "#FE595E",
  className: "z-50",
  delay: 100,
});
Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);
function MyApp({ Component, pageProps: { session, ...pageProps }  }) {
  return( 
    <SessionProvider session={session}>

  <Component {...pageProps} />
  </SessionProvider>

  )
}

export default MyApp

{/* <title>My page</title>
<meta
  name="viewport"
  content="minimum-scale=1, initial-scale=1, width=device-width"
/> */}
