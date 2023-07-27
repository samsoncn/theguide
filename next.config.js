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
      // {
      //   source: "/api/app/:path*",
      //   destination:
      //     process.env.NODE_ENV === "development"
      //       ? "http://127.0.0.1:8000/api/app/:path*"
      //       : "https://theguidesai.vercel.app//api/app/:path*"
      //         // "/api/app/",

      //   // headers: [
      //   //   { key: "Access-Control-Allow-Credentials", value: "true" },
      //   //   { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
      //   //   {
      //   //     key: "Access-Control-Allow-Methods",
      //   //     value: "GET,DELETE,PATCH,POST,PUT",
      //   //   },
      //   //   {
      //   //     key: "Access-Control-Allow-Headers",
      //   //     value:
      //   //       "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      //   //   },
      //   // ],
      // },
      {
        source: "/api/app/conversation",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type,Authorization",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
