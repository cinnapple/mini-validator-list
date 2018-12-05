declare namespace lib {
  export type HashMap<TType> = { [key: string]: TType };

  export interface IProcessEnv extends HashMap<string> {}

  export interface IConfiguration {
    /**
     * port to run the backend server
     */
    port: number;
    isProduction: boolean;
    redis: {
      port: number;
      host: string;
    };
    ripple: {
      /**
       * Ripple's endpoint to fetch the default UNL data.
       */
      defaultUnlSite: string;
      /**
       * Ripple's data api endpoint to fetch the list of validators.
       */
      validatorsUrl: string;
      /**
       * Ripple's data api endpoint to fetch the list of daily reports.
       */
      validatorDailyReportsUrl: string;
      /**
       * Domains that should be excluded from Main Net. Separate each regex with OR (|) operator
       */
      altNetDomainsPattern: RegExp;
    };
    ipStack: {
      /**
       * IPStack (geolocation service)' api endpoint.
       */
      url: string;
      apiKey: string;
    };
    github: {
      /**
       * GitHub personal token (https://github.com/settings/tokens) - increase the rate limit to 5000 times an hour
       */
      token: string;
    };
    ga: {
      /**
       * The view id for google analytics
       */
      viewId: string;
      /**
       * The domains to be excluded when constructing referrer data
       */
      excludedReferralDomainsRegex: RegExp;
    };
  }

  export interface ILogger {
    info(message: string);
    warn(message: string);
    error(message: string);
  }

  export interface ILoggerFactory {
    create(name: string): ILogger;
  }

  export interface IWebClient {
    get: <T>(url: string) => Promise<T>;
  }

  export interface ICrypto {
    parseDefaultUNLBlob: (blob: string) => string[];
  }

  /**
   * API Handlers
   */
  export type HandlerArgs<TParams, TQuery> = {
    params: TParams;
    query: TQuery;
  };

  export type Handler<TParams, TQuery, TData> = (
    args?: HandlerArgs<TParams, TQuery>
  ) => Promise<TData>;

  export type Route = {
    method: string;
    path: string;
    handler: Function;
  };

  export interface IRoutes {
    get(): Route[];
  }

  export interface ICache {
    get: <TItem>(
      key: string,
      variant: string,
      setter: () => Promise<TItem>,
      interval: number
    ) => Promise<TItem>;
  }
}
