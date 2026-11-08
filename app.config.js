// Reads app.json. For hosting under a sub-path (GitHub Pages serves this site at
// https://<user>.github.io/<repo>/), set EXPO_BASE_URL=/<repo> when building.
module.exports = ({ config }) => {
  const baseUrl = process.env.EXPO_BASE_URL;
  if (!baseUrl) return config;
  return {
    ...config,
    experiments: { ...(config.experiments || {}), baseUrl },
  };
};
