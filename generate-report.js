const HtmlGenerator = require('wdio-html-nice-reporter/lib/htmlGenerator');

HtmlGenerator.htmlOutput({
  outputDir: './reports/html-reports/',
  filename: 'report.html',
  reportTitle: 'WebdriverIO Test Report',
});
