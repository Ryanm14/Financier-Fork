import angular from 'angular';

//@ts-ignore
if (process.env.NODE_ENV === 'production') {
  //@ts-ignore
  require('./selfxssWarning');
}

//@ts-ignore
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

import {react2angular} from 'react2angular/index';
import {BudgetSelectorList} from './budgetSelector/budgetSelectorList.jsx';
import {BudgetSelector} from './budgetSelector/budgetSelector.jsx';

runConfig.$inject = ['$injector'];
function runConfig($injector) {
  window.$injector = $injector;
}


// @ts-ignore
angular.module('financier')
  .component('budgetSelectorList', react2angular(BudgetSelectorList))
  .component('budgetSelector', react2angular(BudgetSelector))
  .run(runConfig);
