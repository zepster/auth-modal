module.exports = (api) => {
  const isTest = api.env('test');
  if (isTest) {
    return {
      plugins: ['@babel/plugin-transform-modules-commonjs']
    };
  }
  return {
    presets: [
      '@vue/app',
    ],
  };
};
