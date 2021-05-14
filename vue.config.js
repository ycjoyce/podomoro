module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/scss/all.scss";`,
      },
    },
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/podomoro/'
    : '/',
};