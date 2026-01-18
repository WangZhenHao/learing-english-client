// const path = require('path');
import path from 'path';
import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.alias = {
          ...config.resolve.alias,
          '@app': path.resolve(process.cwd(), './src/app/[locale]'),
        };
        return config;
      },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
