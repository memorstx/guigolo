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
        source: '/go/linkedin-memorstx',
        destination: '/?utm_source=linkedin_memorstx&utm_medium=profile&utm_campaign=profile_referral',
        permanent: false,
      },
      {
        source: '/go/linkedin-guigolo',
        destination: '/?utm_source=linkedin_guigolo&utm_medium=profile&utm_campaign=profile_referral',
        permanent: false,
      },
      {
        source: '/go/instagram',
        destination: '/?utm_source=instagram&utm_medium=bio&utm_campaign=portfolio_navigation',
        permanent: false,
      },
      {
        source: '/go/steam',
        destination: '/?utm_source=steam&utm_medium=bio&utm_campaign=entertainment_navigation',
        permanent: false,
      },
      {
        source: '/go/indeed',
        destination: '/?utm_source=indeed&utm_medium=bio&utm_campaign=job_search_navigation',
        permanent: false,
      },
      {
        source: '/go/x',
        destination: '/?utm_source=twitter&utm_medium=bio&utm_campaign=social_navigation',
        permanent: false,
      },
      {
        source: '/go/email',
        destination: '/?utm_source=email&utm_medium=bio&utm_campaign=contact_navigation',
        permanent: false,
      },
      {
        source: '/go/resume',
        destination: '/?utm_source=resume&utm_medium=bio&utm_campaign=career_navigation',
        permanent: false,
      },
      {
        source: '/go/facebook',
        destination: '/?utm_source=facebook&utm_medium=bio&utm_campaign=social_navigation',
        permanent: false,
      },
      {
        source: '/go/youtube',
        destination: '/?utm_source=youtube&utm_medium=bio&utm_campaign=entertainment_navigation',
        permanent: false,
      },
      {
        source: '/go/gitlab',
        destination: '/?utm_source=gitlab&utm_medium=bio&utm_campaign=development_navigation',
        permanent: false,
      },
      {
        source: '/go/dribbble',
        destination: '/?utm_source=dribbble&utm_medium=bio&utm_campaign=design_navigation',
        permanent: false,
      },
      {
        source: '/go/onlyfans',
        destination: '/?utm_source=onlyfans&utm_medium=bio&utm_campaign=social_navigation',
        permanent: false,
      },
      {
        source: '/go/uxcel',
        destination: '/?utm_source=uxcel&utm_medium=bio&utm_campaign=design_navigation',
        permanent: false,
      },
      {
        source: '/go/platzi',
        destination: '/?utm_source=platzi&utm_medium=bio&utm_campaign=education_navigation',
        permanent: false,
      }
    ]
  },
  async headers() {
    return [
      {
        source: "/hero/scene.svg",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, noimageindex" },
        ],
      },
    ];
  }

  
};



export default nextConfig;
