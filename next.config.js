// // /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //   reactStrictMode: true,
// // };

// // module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   rewrites: async () => {
//     return [
//       {
//         source: "/api/app/:path*",
//         destination:
//           process.env.NODE_ENV === "development"
//             ? "http://127.0.0.1:8000/api/app/:path*"
//             : "/api/app/",
//       },
//     ];
//   },
// };

// module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/app/:path*",
        destination:
          process.env.NODE_ENV === "production"
            ? "https://theguidesai.vercel.app/api/app/:path*"
            : "http://127.0.0.1:8000/api/app/:path*",
        // : "/api/app/",
      },
    ];
  },
};

module.exports = nextConfig;
