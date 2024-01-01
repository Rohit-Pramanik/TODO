module.exports = () => {
  return {
    reactStrictMode: true,
    env: {
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_MESSAGEING_SENDING_ID,
      appId: process.env.NEXT_PUBLIC_APP_ID,
      userName: process.env.NEXT_PUBLIC_USER_NAME,
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecretKey: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
};
