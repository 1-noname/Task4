import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import SimpleImportSort from "eslint-plugin-simple-import-sort";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),

  {
    plugins: { "simple-import-sort": SimpleImportSort },

    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react$", "^react-dom$", "^react"],
            ["^@/"],
            ["^\\.\\.", "^\\."],
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
