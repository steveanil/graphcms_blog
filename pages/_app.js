/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Layout } from '../components';

import 'tailwindcss/tailwind.css';
import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }) => (
  <Layout>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </Layout>

);

export default MyApp;
