import 'zone.js';
import 'reflect-metadata';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { setAngularLib } from '@angular/upgrade/static';
import * as angular from 'angular';
import { AppModule } from './app.module';


// @ts-ignore
if (process.env.NODE_ENV === 'production') {
    // @ts-ignore
    require('./selfxssWarning');
}

// @ts-ignore
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

import './app.module.ajs';
import './app.controllers';
import './app.directives';
import './app.filters';
import './app.services';


setAngularLib(angular);
platformBrowserDynamic().bootstrapModule(AppModule);
