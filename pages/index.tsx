import Head from 'next/head'
import React from 'react'

import axios from 'axios';

export type MapType = number[][];

export default function Home() {
 
  return (
    <>
      <Head>
        <title>ChatGPTJS</title>
        <meta name="description" content="ChatGPTJS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="ChatGPTJS">
          <p> Go to Api Folder </p>
        </div>
      </main>
    </>
  )
}
