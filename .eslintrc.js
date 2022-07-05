module.exports = {
  extends: [
      "@volusion/eslint-config",
      "@volusion/eslint-config/typescript",
  ],
  rules: {
      "jsdoc/require-jsdoc": "off",
      "import/extensions": [
          "error",
          "never",
          {
              scss: "always",
              svg: "always",
              png: "always",
              jpg: "always",
          },
      ],
      "import/no-extraneous-dependencies": [
          "error",
          {
              devDependencies: [
                  "./*.config.ts",
                  "./*.config.js",
                  "src/__mock-api__/**/*.*",
                  "**/*.spec.ts",
                  "**/*.spec.tsx",
                  "**/*.test.ts",
                  "**/*.test.tsx",
                  "**/*.spec.js",
                  "**/*.stories.tsx",
                  "**/*.stories.ts",
                  "cypress/**/*.js",
                  "scripts/**/*.js",
                  "**/__test-utils__/**/*.{tsx,ts}",
              ],
          },
      ],
  },
  overrides: [
      {
          // For JS files outside the project, don't parse them as TypeScript
          files: ["**/*.js"],
          excludedFiles: ["src/**/*"],
          parser: "espree",
          rules: {
              // These rules throw an error without the TypeScript parser
              "@typescript-eslint/naming-convention": "off",
              "@typescript-eslint/dot-notation": "off",
              "@typescript-eslint/no-implied-eval": "off",
              "@typescript-eslint/no-throw-literal": "off",
              "@typescript-eslint/return-await": "off",
          },
      },
  ],
};
