import Head from 'next/head'

export default function GaInitializer() {
  if(!process.env.NEXT_PUBLIC_GA_TRACKING_ID) return null
  return (
    <Head>
      <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
      `
        }}
      />
    </Head>
  )
}