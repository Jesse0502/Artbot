/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    // Add a new rule to handle WAV files
    config.module.rules.push({
      test: /\.wav$/,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/assets/",
            outputPath: `${isServer ? "../" : ""}static/sounds/`,
            name: "[name].[ext]",
            esModule: false,
          },
        },
      ],
    });
    return config;
  },
};

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  sw: "/sw.js",
  // disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA(nextConfig);
