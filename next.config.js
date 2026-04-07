/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
          domains: [],
    },
    typescript: {
          ignoreBuildErrors: true,
    },
    eslint: {
          ignoreDuringBuilds: true,
    },
    outputFileTracingIncludes: {
          '/api/generate-certificate': ['./node_modules/pdfkit/js/data/**/*'],
    },
}

module.exports = nextConfig
