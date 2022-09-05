import React from 'react'
import { Layout } from '../components';

import 'tailwindcss/tailwind.css';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <title>Bible Apologist</title>
    </Layout>
    
  )
}

export default MyApp
