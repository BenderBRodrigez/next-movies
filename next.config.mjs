/** @type {import('next').NextConfig} */
import TerserPlugin from "terser-webpack-plugin";

const nextConfig = {
  webpack(config) {
    config.ignoreWarnings = [
      {
        module: /typeorm/,
        message: /Module not found|dependency is an expression/,
      },
    ];
    config.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            keep_classnames: true,
          },
        }),
      ],
    };
    return config;
  },
};

export default nextConfig;
