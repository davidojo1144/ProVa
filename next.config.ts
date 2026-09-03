import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  // Keep readable source out of production builds.
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
};

export default nextConfig;
