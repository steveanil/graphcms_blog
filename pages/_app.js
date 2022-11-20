/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { IBM_Plex_Sans } from '@next/font/google';
import { Layout } from '../components';

import 'tailwindcss/tailwind.css';
import '../styles/globals.scss';

const ibm = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: '400',
});

const MyApp = ({ Component, pageProps }) => (
  <Layout>
    <main className={ibm.className}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </main>
    <Analytics />
  </Layout>

);

export default MyApp;
