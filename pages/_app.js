import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { trackPageview } from '@pb/google_analytics'

import '../styles/tailwind.css'
import '../styles/highlight.css'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    router.events.on("routeChangeComplete", trackPageview)
    return () => {
      router.events.on("routeChangeComplete", trackPageview)
    }
  }, [router.events])

  return <Component {...pageProps} />
}