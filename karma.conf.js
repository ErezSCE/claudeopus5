// Karma configuration for `ng test`.
// Uses the Chromium binary bundled with puppeteer when CHROME_BIN is not set,
// so headless tests run on machines without a system Chrome install.
if (!process.env.CHROME_BIN) {
  try {
    process.env.CHROME_BIN = require('puppeteer').executablePath();
  } catch {
    // Fall back to karma-chrome-launcher's own browser discovery.
  }
}

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      jasmine: {},
      clearContext: false,
    },
    jasmineHtmlReporter: {
      suppressAll: true,
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/claudeopus5'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }],
    },
    reporters: ['progress', 'kjhtml'],
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: ['--headless=new', '--no-sandbox', '--remote-debugging-port=9222', '--disable-gpu', '--disable-dev-shm-usage'],
      },
    },
    browsers: ['ChromeHeadless'],
    restartOnFileChange: true,
  });
};
