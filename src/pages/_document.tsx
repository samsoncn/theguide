import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon_main.ico" />
      </Head>
      <body className="bg-[#E3E3E3]">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}