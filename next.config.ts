import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/es",
        permanent: false,
      },
      {
        source: "/que-es-guigolo",
        destination: "/es/what-is-guigolo",
        permanent: true,
      },
      {
        source: "/what-is-guigolo",
        destination: "/en/what-is-guigolo",
        permanent: true,
      },
      {
        source: "/es/que-es-guigolo",
        destination: "/es/what-is-guigolo",
        permanent: true,
      },

      {
        source: '/go/figma',
        destination: '/es?utm_source=figma&utm_medium=profile&utm_campaign=profile_referral',
        permanent: false,
      },
      {
        source: '/go/github',
        destination: '/es?utm_source=github&utm_medium=profile&utm_campaign=profile_referral',
        permanent: false,
      },
      {
        source: '/go/behance',
        destination: '/es?utm_source=behance&utm_medium=profile&utm_campaign=profile_referral',
        permanent: false,
      },
      {
        source: '/go/linkedin-memorstx',
        destination: '/es?utm_source=linkedin_memorstx&utm_medium=profile&utm_campaign=profile_referral',
        permanent: false,
      },
      {
        source: '/go/linkedin-guigolo',
        destination: '/es?utm_source=linkedin_guigolo&utm_medium=profile&utm_campaign=profile_referral',
        permanent: false,
      },
      {
        source: '/go/instagram-memorstx',
        destination: '/es?utm_source=instagram_memorstx&utm_medium=bio&utm_campaign=portfolio_navigation',
        permanent: false,
      },
      {
        source: '/go/steam',
        destination: '/es?utm_source=steam&utm_medium=bio&utm_campaign=entertainment_navigation',
        permanent: false,
      },
      {
        source: '/go/indeed',
        destination: '/es?utm_source=indeed&utm_medium=bio&utm_campaign=job_search_navigation',
        permanent: false,
      },
      {
        source: '/go/occ',
        destination: '/es?utm_source=occ&utm_medium=bio&utm_campaign=job_search_navigation',
        permanent: false,
      },
      {
        source: '/go/x',
        destination: '/es?utm_source=twitter&utm_medium=bio&utm_campaign=social_navigation',
        permanent: false,
      },
      {
        source: '/go/email',
        destination: '/es?utm_source=email&utm_medium=bio&utm_campaign=contact_navigation',
        permanent: false,
      },
      {
        source: '/go/resume',
        destination: '/es?utm_source=resume&utm_medium=bio&utm_campaign=career_navigation',
        permanent: false,
      },
      {
        source: '/go/facebook',
        destination: '/es?utm_source=facebook&utm_medium=bio&utm_campaign=social_navigation',
        permanent: false,
      },
      {
        source: '/go/youtube',
        destination: '/es?utm_source=youtube&utm_medium=bio&utm_campaign=entertainment_navigation',
        permanent: false,
      },
      {
        source: '/go/gitlab',
        destination: '/es?utm_source=gitlab&utm_medium=bio&utm_campaign=development_navigation',
        permanent: false,
      },
      {
        source: '/go/dribbble',
        destination: '/es?utm_source=dribbble&utm_medium=bio&utm_campaign=design_navigation',
        permanent: false,
      },
      {
        source: '/go/onlyfans',
        destination: '/es?utm_source=onlyfans&utm_medium=bio&utm_campaign=social_navigation',
        permanent: false,
      },
      {
        source: '/go/uxcel',
        destination: '/es?utm_source=uxcel&utm_medium=bio&utm_campaign=design_navigation',
        permanent: false,
      },
      {
        source: '/go/platzi',
        destination: '/es?utm_source=platzi&utm_medium=bio&utm_campaign=education_navigation',
        permanent: false,
      },
      {
        source: '/go/codepen',
        destination: '/es?utm_source=codepen&utm_medium=bio&utm_campaign=development_navigation',
        permanent: false,
      },
      {
        source: '/go/medium',
        destination: '/es?utm_source=medium&utm_medium=bio&utm_campaign=content_navigation',
        permanent: false,
      },
      {
        source: '/go/wakatime',
        destination: '/es?utm_source=wakatime&utm_medium=bio&utm_campaign=productivity_navigation',
        permanent: false,
      },
      {
        source: '/go/discord',
        destination: '/es?utm_source=discord&utm_medium=bio&utm_campaign=social_navigation',
        permanent: false,
      },
      {
        source: '/go/sketchfab',
        destination: '/es?utm_source=sketchfab&utm_medium=bio&utm_campaign=3d_navigation',
        permanent: false,
      },
      {
        source: '/go/whatsapp',
        destination: '/es?utm_source=whatsapp&utm_medium=bio&utm_campaign=communication_navigation',
        permanent: false,
      },
      {
        source: '/go/google',
        destination: '/es?utm_source=google&utm_medium=bio&utm_campaign=search_navigation',
        permanent: false,
      },
      {
        source: '/go/spotify',
        destination: '/es?utm_source=spotify&utm_medium=bio&utm_campaign=entertainment_navigation',
        permanent: false,
      },
      {
        source: '/go/twitch',
        destination: '/es?utm_source=twitch&utm_medium=bio&utm_campaign=entertainment_navigation',
        permanent: false,
      },
      {
        source: '/go/apple',
        destination: '/es?utm_source=apple&utm_medium=bio&utm_campaign=technology_navigation',
        permanent: false,
      },
      {
        source: '/go/microsoft',
        destination: '/es?utm_source=microsoft&utm_medium=bio&utm_campaign=technology_navigation',
        permanent: false,
      },
      {
        source: '/go/personal-website',
        destination: '/es?utm_source=personal-website&utm_medium=bio&utm_campaign=personal_navigation',
        permanent: false,
      },
      {
        source: '/go/stackoverflow',
        destination: '/es?utm_source=stackoverflow&utm_medium=bio&utm_campaign=development_navigation', 
        permanent: false,
      },
      {
        source: '/go/atlassian',
        destination: '/es?utm_source=atlassian&utm_medium=bio&utm_campaign=productivity_navigation',
        permanent: false,
      },
      {
        source: '/go/trello',
        destination: '/es?utm_source=trello&utm_medium=bio&utm_campaign=productivity_navigation',
        permanent: false,
      },
      {
        source: '/go/slack',
        destination: '/es?utm_source=slack&utm_medium=bio&utm_campaign=communication_navigation',
        permanent: false,
      },
      {
        source: '/go/notion',
        destination: '/es?utm_source=notion&utm_medium=bio&utm_campaign=productivity_navigation',
        permanent: false,
      },
      {
        source: '/go/airtable',
        destination: '/es?utm_source=airtable&utm_medium=bio&utm_campaign=productivity_navigation', 
        permanent: false,
      },
      {
        source: '/go/multiplica',
        destination: '/es?utm_source=multiplica&utm_medium=bio&utm_campaign=productivity_navigation', 
        permanent: false,
      },
      {
        source: '/go/bongodex',
        destination: '/es?utm_source=bongodex&utm_medium=bio&utm_campaign=portfoloio_navigation', 
        permanent: false,
      },
      
    ]
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value:
              '</llms.txt>; rel="service-doc"; type="text/plain", </.well-known/agent-skills/index.json>; rel="service-doc"; type="application/json"',
          },
        ],
      },
      {
        source: "/:locale(es|en)",
        headers: [
          {
            key: "Link",
            value:
              '</llms.txt>; rel="service-doc"; type="text/plain", </.well-known/agent-skills/index.json>; rel="service-doc"; type="application/json"',
          },
        ],
      },
      {
        source: "/brand/hero/scene.svg",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, noimageindex" },
        ],
      },
    ];
  }

  
};



export default nextConfig;
