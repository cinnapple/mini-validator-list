import { res } from "./services/i18nService";

const links = [
  {
    path: "/",
    res: res.HOME
  },
  {
    path: "/validators",
    res: res.MENU_VALIDATORS
  },
  {
    path: "/settings",
    res: res.SETTINGS
  },
  // {
  //   path: "/about",
  //   res: res.SETTINGS
  // },
  // {
  //   path: "/feedback",
  //   res: res.SETTINGS
  // },
  {
    path: "/external",
    res: res.MENU_EXTERNAL,
    sub: [
      // {
      //   path: "/setup",
      //   res: res.SETTINGS
      // },
      {
        path: "https://ripple.com",
        res: res.LINK_RIPPLE
      },
      {
        path: "https://xrpcharts.ripple.com",
        res: res.LINK_XRPCHART
      }
    ]
  },
  {
    path: "/get-in-touch",
    res: res.MENU_GET_IN_TOUCH,
    sub: [
      {
        path: "https://twitter.com/CinnappleFun",
        res: res.LINK_TWITTER
      },
      {
        path: "https://github.com/cinnapple/mini-validator-list",
        res: res.LINK_GITHUB
      }
    ]
  },
  {
    path: "https://www.xrptipbot.com/u:CinnappleFun/n:twitter",
    res: res.LINK_DONATE
  }
];

export { links };
