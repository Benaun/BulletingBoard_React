/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true,
    // eslint: { ignoreDuringBuilds: true }, // eslint:disable
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/u/**',
            },
        ],
    },
    experimental: { esmExternals: true }, // Для правильного импорта SWR
};

module.exports = nextConfig;