/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions : true
    },
    images: {
        domains: ['localhost' , 'res.cloudinary.com' , 'drive.google.com'],
    },
}

module.exports = nextConfig
