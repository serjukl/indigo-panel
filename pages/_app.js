/* eslint-disable react/prop-types */
import '../styles/globals.css'
import React from 'react'
import Head from 'next/head'

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
