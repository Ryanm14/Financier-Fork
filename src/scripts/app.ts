// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
if (process.env.NODE_ENV === 'production') {
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
  require('./selfxssWarning');
}

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'fast... Remove this comment to see the full error message
import fastclick from 'fastclick';
fastclick.attach(document.body);

import 'angular';

import 'lato-webfont/fonts/lato-hairline-webfont.woff';
import 'lato-webfont/fonts/lato-thin-webfont.woff';
import 'lato-webfont/fonts/lato-light-webfont.woff';
import 'lato-webfont/fonts/lato-regular-webfont.woff';
import 'lato-webfont/fonts/lato-medium-webfont.woff';
import 'lato-webfont/fonts/lato-semibold-webfont.woff';
import 'lato-webfont/fonts/lato-bold-webfont.woff';
import 'lato-webfont/fonts/lato-heavy-webfont.woff';
import 'lato-webfont/fonts/lato-black-webfont.woff';

import '../styles/app.scss';

import './app.module';
import './app.controllers';
import './app.directives';
import './app.filters';
import './app.services';
