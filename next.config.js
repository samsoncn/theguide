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
  rewrites: async ({ req, resolvedUrl }) => {
    if (req.headers["x-forwarded-proto"] === "https") {
      return [
        {
          source: "/api/app/:path*",
          destination:
            process.env.NODE_ENV === "development"
              ? "http://127.0.0.1:8000/api/app/:path*"
              : "https://theguidesai.vercel.app/api/app/:path*",
        },
      ];
    } else {
      return [
        {
          source: "/api/app/:path*",
          destination: `https://${req.headers.host}${resolvedUrl}`,
        },
      ];
    }
  },
};

module.exports = nextConfig;

module.exports = nextConfig;
