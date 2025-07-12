export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>ReWear - Community Clothing Exchange</title>
        <meta name="description" content="Sustainable fashion through clothing exchange" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}


import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
