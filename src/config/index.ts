const config = {
    getConfigValue() {
      const rawConfig = {
        BASE_API_URL:
          process.env.NEXT_LOCAL_API_BASE_URL, 
        API_ENVIRONMENT: process.env.NEXT_LOCAL_API_ENVIRONMENT,
        SECRET_KEY: process.env.NEXT_SESSION_SECRET_KEY,
        APP_URL: process.env.NEXT_BASE_APP_URL,
      };
      if (rawConfig.BASE_API_URL) {
        rawConfig.BASE_API_URL = rawConfig.BASE_API_URL.replace(/\/+$/, '');
      }

      return rawConfig;
    },
  };
  
  export default config;