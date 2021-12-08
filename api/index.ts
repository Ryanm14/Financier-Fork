// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'path'.
const path = require('path');
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const fs = require('fs');

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const helmet = require('helmet');
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const express = require('express');
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const uuid = require('uuid');
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const csp = require('helmet-csp');
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const cheerio = require('cheerio');

const app = express();

// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
app.use('/docs', express.static(path.join(__dirname, '../docs')));

// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
var statics = express.static(path.join(__dirname, '../dist'));

// Don't serve index.html
function staticDir() {
  return function (req: any, res: any, next: any) {
    if (req.path !== '/') {
      return statics(req, res, next);
    }

    return next();
  };
}

app.use(staticDir());

// Even though index.html is static, we don't want to cache it
// since the service worker does regardless of the header cache settings
// (otherwise upgrades sometimes require an extra refresh)
app.use(helmet.noCache());

app.use(function (req: any, res: any, next: any) {
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
  res.locals.nonce = new Buffer(uuid.v4(), 'binary').toString('base64');
  next();
});

app.use(csp({
  // Specify directives as normal.
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'strict-dynamic'", function (req: any, res: any) {
        return "'nonce-" + res.locals.nonce + "'";
      }, "'unsafe-inline'", 'http:', 'https:'],
    styleSrc: [function (req: any, res: any) {
        return "'nonce-" + res.locals.nonce + "'";
      }, "'unsafe-inline'", 'http:', 'https:'],
    fontSrc: ["'self'", 'data:'],
    imgSrc: ["'self'", 'https://www.gravatar.com'],
    // sandbox: ['allow-forms', 'allow-scripts'],
    reportUri: '/report-violation',
    objectSrc: ["'none'"],
    baseUri: ["'self'"],
    frameSrc: ['https://js.stripe.com'],
    blockAllMixedContent: true
  },

  // This module will detect common mistakes in your directives and throw errors
  // if it finds any. To disable this, enable "loose mode".
  loose: false,

  // Set to true if you only want browsers to report errors, not block them.
  // You may also set this to a function(req, res) in order to decide dynamically
  // whether to use reportOnly mode, e.g., to allow for a dynamic kill switch.
  reportOnly: false,

  // Set to true if you want to blindly set all headers: Content-Security-Policy,
  // X-WebKit-CSP, and X-Content-Security-Policy.
  setAllHeaders: false,

  // Set to true if you want to disable CSP on Android where it can be buggy.
  disableAndroid: false,

  // Set to false if you want to completely disable any user-agent sniffing.
  // This may make the headers less compatible but it will be much faster.
  // This defaults to `true`.
  browserSniff: true
}));


// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
const html = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8');
const $ = cheerio.load(html);

const styles = $('style');
const links = $('link[rel="stylesheet"]');
const scripts = $('script');

app.all('/*', (req: any, res: any) => {
  styles.attr('nonce', res.locals.nonce);
  links.attr('nonce', res.locals.nonce);
  scripts.attr('nonce', res.locals.nonce);

  res.send($.html());
});
//For example in Express you may want to use: res.send(noncifiedHTML);

app.listen(8080, () => {
  console.log('Financier frontend listening on port 8080!');
});
