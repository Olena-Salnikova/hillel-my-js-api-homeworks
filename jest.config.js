/** @type {import('jest').Config} */
const config = {
  verbose: true,
  injectGlobals: false,
  testTimeout: 30000,
  transform: {},
  "reporters": [
	  "default",
	  ["./node_modules/jest-html-reporter", {
		"pageTitle": "QAuto API Tests Report",
    includeFailureMsg: true,
    includeStackTrace: true,
	}]
]
};

export default config;