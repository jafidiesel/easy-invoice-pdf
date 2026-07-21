module.exports = {
  // Run type-check, lint, knip, prettify, and vitest on all changes to files
  // https://github.com/okonet/lint-staged
  // Note: the "check-github-actions-security" (zizmor) step was removed here since
  // zizmor is a separate CLI (not an npm package) and isn't installed locally.
  // It still runs in CI via .github/workflows/zizmor.yml.
  "*": () => [
    `npm run type-check:go`,
    `npm run lint`,
    `npm run knip`,
    `npm run vitest -- --run --reporter=verbose`,
    `npm run prettify -- --write`,
  ],
};
