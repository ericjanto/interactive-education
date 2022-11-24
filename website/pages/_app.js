import { UserProvider } from '@auth0/nextjs-auth0'
import '../styles/globals.css'
import '../styles/hovercard.css'
import '../styles/template-style.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <UserProvider>
      <link rel="preconnect" href="https://rsms.me/" />
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
