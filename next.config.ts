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
        source: '/go/instagram-memorstx',
        destination: '/?utm_source=instagram_memorstx&utm_medium=bio&utm_campaign=portfolio_navigation',
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
        source: '/go/occ',
        destination: '/?utm_source=occ&utm_medium=bio&utm_campaign=job_search_navigation',
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
      },
      {
        source: '/go/codepen',
        destination: '/?utm_source=codepen&utm_medium=bio&utm_campaign=development_navigation',
        permanent: false,
      },
      {
        source: '/go/medium',
        destination: '/?utm_source=medium&utm_medium=bio&utm_campaign=content_navigation',
        permanent: false,
      },
      {
        source: '/go/wakatime',
        destination: '/?utm_source=wakatime&utm_medium=bio&utm_campaign=productivity_navigation',
        permanent: false,
      },
      {
        source: '/go/discord',
        destination: '/?utm_source=discord&utm_medium=bio&utm_campaign=social_navigation',
        permanent: false,
      },
      {
        source: '/go/sketchfab',
        destination: '/?utm_source=sketchfab&utm_medium=bio&utm_campaign=3d_navigation',
        permanent: false,
      },
      {
        source: '/go/whatsapp',
        destination: '/?utm_source=whatsapp&utm_medium=bio&utm_campaign=communication_navigation',
        permanent: false,
      },
      {
        source: '/go/google',
        destination: '/?utm_source=google&utm_medium=bio&utm_campaign=search_navigation',
        permanent: false,
      },
      {
        source: '/go/spotify',
        destination: '/?utm_source=spotify&utm_medium=bio&utm_campaign=entertainment_navigation',
        permanent: false,
      },
      {
        source: '/go/twitch',
        destination: '/?utm_source=twitch&utm_medium=bio&utm_campaign=entertainment_navigation',
        permanent: false,
      },
      {
        source: '/go/apple',
        destination: '/?utm_source=apple&utm_medium=bio&utm_campaign=technology_navigation',
        permanent: false,
      },
      {
        source: '/go/microsoft',
        destination: '/?utm_source=microsoft&utm_medium=bio&utm_campaign=technology_navigation',
        permanent: false,
      },
      {
        source: '/go/personal-website',
        destination: '/?utm_source=personal-website&utm_medium=bio&utm_campaign=personal_navigation',
        permanent: false,
      },
      {
        source: '/go/stackoverflow',
        destination: '/?utm_source=stackoverflow&utm_medium=bio&utm_campaign=development_navigation', 
        permanent: false,
      },
      {
        source: '/go/atlassian',
        destination: '/?utm_source=atlassian&utm_medium=bio&utm_campaign=productivity_navigation',
        permanent: false,
      },
      {
        source: '/go/trello',
        destination: '/?utm_source=trello&utm_medium=bio&utm_campaign=productivity_navigation',
        permanent: false,
      },
      {
        source: '/go/slack',
        destination: '/?utm_source=slack&utm_medium=bio&utm_campaign=communication_navigation',
        permanent: false,
      },
      {
        source: '/go/notion',
        destination: '/?utm_source=notion&utm_medium=bio&utm_campaign=productivity_navigation',
        permanent: false,
      },
      {
        source: '/go/airtable',
        destination: '/?utm_source=airtable&utm_medium=bio&utm_campaign=productivity_navigation', 
        permanent: false,
      },
      
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
