/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'municipaldemairena.com'
            }
        ]
    }
};

export default nextConfig;
