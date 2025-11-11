import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* Ensure Next.js uses the correct workspace root for dependency tracing */
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
