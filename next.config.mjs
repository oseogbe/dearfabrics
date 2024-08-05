/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mdbcdn.b-cdn.net',
                port: '',
                pathname: '/img/Photos/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                port: '',
                pathname: '/images/**',
            }
        ]
    }
};

export default nextConfig;
