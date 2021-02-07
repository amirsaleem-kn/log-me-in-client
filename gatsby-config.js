module.exports = {
  siteMetadata: {
    title: "LogMeInClient",
  },
  
  plugins: [
    "gatsby-plugin-use-query-params",
    {
      resolve: "gatsby-plugin-sass",
      options: {
        useResolveUrlLoader: true,
      },
    },
  ],
};
