// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/kps',
          destination: 'https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx', // Hedef SOAP servisi
        },
      ];
    },
  };
  
  export default nextConfig;
  