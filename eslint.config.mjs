import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";


export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  { languageOptions: {
    parser: 'babel-eslint',
    parserOptions: {
      ecmaFeatures: { jsx: true }
    } } },
  {languageOptions:
    { globals: globals.browser }
  },
  pluginJs.configs.recommended,
  pluginReactConfig,
];
