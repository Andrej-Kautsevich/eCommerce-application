module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-rational-order'],
  validate: ['css', 'scss'],
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
};
