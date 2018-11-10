require('dotenv').config();
export default {
  port: 80,
  isProduction: process.env.NODE_ENVIRONMENT === 'production',
  redis: {
    host: 'mini-validator-list-redis',
    port: 6379,
  },
  ripple: {
    defaultUnlSite: 'https://vl.ripple.com',
    validatorsUrl: 'https://data.ripple.com/v2/network/validators',
    validatorDailyReportsUrl:
      'https://data.ripple.com/v2/network/validator_reports',
    altNetDomainsPattern: new RegExp('.*ripple.com/build/xrp-test-net.*'),
  },
  ipStack: {
    url: 'http://api.ipstack.com',
    apiKey: process.env.IPSTACK_API_KEY,
  },
  github: {
    token: process.env.GITHUB_PERSONAL_TOKEN,
  },
  ga: {
    viewId: process.env.GA_VIEW_ID,
    excludedReferralDomainsRegex: new RegExp(
      '^(direct)$|^t.co$|^youtube.com$|^github.com$|.*facebook.com$|.*xrptipbot.com$',
    ),
  },
} as lib.IConfiguration;
