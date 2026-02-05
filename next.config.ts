import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
  return [
    {
      source: '/go/figma',
      destination: '/?utm_source=figma&utm_medium=profile&utm_campaign=profile_referral',
      permanent: false,
    },
    {
      source: '/go/github',
      destination: '/?utm_source=github&utm_medium=profile&utm_campaign=profile_referral',
      permanent: false,
    },
    {
      source: '/go/behance',
      destination: '/?utm_source=behance&utm_medium=profile&utm_campaign=profile_referral',
      permanent: false,
    },
    {
      source: '/go/linkedin',
      destination: '/?utm_source=linkedin&utm_medium=profile&utm_campaign=profile_referral',
      permanent: false,
    },
    {
      source: '/go/instagram',
      destination: '/?utm_source=instagram&utm_medium=bio&utm_campaign=portfolio_navigation',
      permanent: false,
    },
  ]
}
};



export default nextConfig;
