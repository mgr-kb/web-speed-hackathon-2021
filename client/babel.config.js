module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: 'last 1 Chrome major version',
      },
    ],
    [
      '@babel/preset-react',
      {
        development: process.env.BABEL_ENV === "development",
      },
    ],
  ],
};
