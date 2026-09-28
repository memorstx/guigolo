export type CrawlerCategory =
  | "ai-search"
  | "ai-training"
  | "ai-user"
  | "search"
  | "seo-audit"
  | "social-preview"
  | "automation";

export type DetectedCrawler = {
  name: string;
  category: CrawlerCategory;
};

type Rule = DetectedCrawler & {
  pattern: RegExp;
};

const RULES: Rule[] = [
  { name: "OAI-SearchBot", category: "ai-search", pattern: /OAI-SearchBot/i },
  { name: "GPTBot", category: "ai-training", pattern: /GPTBot/i },
  { name: "ChatGPT-User", category: "ai-user", pattern: /ChatGPT-User/i },

  { name: "Claude-SearchBot", category: "ai-search", pattern: /Claude-SearchBot/i },
  { name: "ClaudeBot", category: "ai-training", pattern: /ClaudeBot/i },
  { name: "Claude-User", category: "ai-user", pattern: /Claude-User/i },

  { name: "PerplexityBot", category: "ai-search", pattern: /PerplexityBot/i },
  { name: "Perplexity-User", category: "ai-user", pattern: /Perplexity-User/i },

  { name: "Googlebot", category: "search", pattern: /Googlebot/i },
  { name: "Google-InspectionTool", category: "search", pattern: /Google-InspectionTool/i },
  { name: "GoogleOther", category: "search", pattern: /GoogleOther/i },
  { name: "AdsBot-Google", category: "search", pattern: /AdsBot-Google/i },
  { name: "bingbot", category: "search", pattern: /bingbot/i },
  { name: "BingPreview", category: "search", pattern: /BingPreview/i },
  { name: "DuckDuckBot", category: "search", pattern: /DuckDuckBot/i },
  { name: "Applebot", category: "search", pattern: /Applebot/i },
  { name: "YandexBot", category: "search", pattern: /YandexBot/i },
  { name: "Baiduspider", category: "search", pattern: /Baiduspider/i },

  { name: "SemrushBot", category: "seo-audit", pattern: /SemrushBot/i },
  { name: "SiteAuditBot", category: "seo-audit", pattern: /SiteAuditBot/i },
  { name: "AhrefsBot", category: "seo-audit", pattern: /AhrefsBot/i },
  { name: "MJ12bot", category: "seo-audit", pattern: /MJ12bot/i },
  { name: "DotBot", category: "seo-audit", pattern: /DotBot/i },
  { name: "Screaming Frog", category: "seo-audit", pattern: /Screaming Frog SEO Spider/i },

  { name: "Facebook Preview", category: "social-preview", pattern: /facebookexternalhit|Facebot/i },
  { name: "X / Twitter Preview", category: "social-preview", pattern: /Twitterbot/i },
  { name: "LinkedIn Preview", category: "social-preview", pattern: /LinkedInBot/i },
  { name: "Slack Preview", category: "social-preview", pattern: /Slackbot/i },
  { name: "Discord Preview", category: "social-preview", pattern: /Discordbot/i },

  {
    name: "Generic automation",
    category: "automation",
    pattern: /bot|crawler|spider|scrapy|curl|wget|python-requests|go-http-client|headlesschrome|lighthouse/i,
  },
];

export function detectCrawler(userAgent: string): DetectedCrawler | null {
  if (!userAgent) return null;

  const rule = RULES.find(({ pattern }) => pattern.test(userAgent));

  return rule
    ? {
        name: rule.name,
        category: rule.category,
      }
    : null;
}
