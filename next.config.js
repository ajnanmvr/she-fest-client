/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions : true
    },
    images: {
        domains: ['localhost' , 'res.cloudinary.com' , 'drive.google.com' ,'flowbite.s3.amazonaws.com'],
    },
}

module.exports = nextConfig
