/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { Layout } from '../components';

import 'tailwindcss/tailwind.css';
import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }) => (
  <Layout>
    <main>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </main>
    <Analytics />
    <SpeedInsights />
  </Layout>
);

export default MyApp;
