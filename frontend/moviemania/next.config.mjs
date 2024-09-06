/** @type {import('next').NextConfig} */

const nextConfig = {
   images: {
     remotePatterns: [
       {
         protocol: "https",
         hostname: "image.tmdb.org",
         pathname: "/t/p/**",
       },
     ],
     unoptimized: true, // Désactive l'optimisation des images
   },
   async rewrites() {
     return [
       {
         source: '/api/users/:path*',
         destination: '${process.env.NEXT_PUBLIC_USERS_API_URL}/api/:path*', // Proxy vers users_api en interne
       },
       {
         source: '/api/recos/:path*',
         destination: '${process.env.NEXT_PUBLIC_RECOS_API_URL}/api/:path*', // Proxy vers recos_api en interne
       },
     ];
   },
 };
 
 export default nextConfig;
 