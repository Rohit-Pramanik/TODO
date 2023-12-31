module.exports = () => {
  return {
    reactStrictMode: true,
    env: {
      api: "123",
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
};
