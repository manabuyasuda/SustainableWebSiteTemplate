module.exports = (ctx) => {
  return {
    plugins: {
      autoprefixer: {},
      cssnano: ctx.env === "production" ? {} : false,
    },
  };
};
