import moment from 'moment';

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').directive('heatMap', ($filter, $locale) => {
  const dateFilter = $filter('date'),
    currency = $filter('currency'),
    intCurrency = $filter('intCurrency'),
    removeDots = $filter('removeDots');
  let FIRSTDAYOFWEEK = $locale.DATETIME_FORMATS.FIRSTDAYOFWEEK;

  if ($locale.id === 'en-au') {
    FIRSTDAYOFWEEK = 0;
  }

  const subs = {};

  function sub(index: any, cb: any) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!subs[index]) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      subs[index] = [];
    }

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    subs[index].push(cb);
  }

  function emit(index: any, e: any) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    subs[index].forEach((cb: any) => cb(e));
  }


  const SQUARE_SIZE = 10;
  const MONTH_LABEL_GUTTER_SIZE = 4;
  const WEEK_LABEL_OFFSET = 16;
  const svgns = 'http://www.w3.org/2000/svg';

  const range = (n: any) => Array.from(Array(n), (_, i) => i);

  const reduce = (arr: any, fn: any, defaultValue: any) => {
    if (arr && arr.length) {
      return arr.reduce(fn, defaultValue);
    }
  };


  function shiftDate(date: any, numDays: any) {
    const newDate = moment(date).toDate();
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  function getBeginningTimeForDate(date: any) {
    return moment(date).startOf('day').toDate();
  }

  // obj can be a parseable string, a millisecond timestamp, or a Date object
  function convertToDate(obj: any) {
    return (obj instanceof Date) ? obj : (moment(obj).toDate());
  }

  const DAYS_IN_WEEK = 7;

  class CalendarHeatmap {
    props: any;
    state: any;
    constructor(props = {}) {
      this.props = props;

      this.state = {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'values' does not exist on type '{}'.
        valueCache: this.getValueCache(props.values),
      };
    }

    getSquareSizeWithGutter() {
      return SQUARE_SIZE + this.props.gutterSize;
    }

    getMonthLabelSize() {
      if (!this.props.showMonthLabels) {
        return 0;
      } else if (this.props.horizontal) {
        return SQUARE_SIZE + MONTH_LABEL_GUTTER_SIZE;
      }
      return 2 * (SQUARE_SIZE + MONTH_LABEL_GUTTER_SIZE);
    }

    getStartDate() {
      return shiftDate(this.getEndDate(), -this.props.numDays + 1); // +1 because endDate is inclusive
    }

    getEndDate() {
      return getBeginningTimeForDate(convertToDate(this.props.endDate));
    }

    getStartDateWithEmptyDays() {
      return shiftDate(this.getStartDate(), -this.getNumEmptyDaysAtStart());
    }

    getNumEmptyDaysAtStart() {
      return this.getStartDate().getDay() - 1 - (FIRSTDAYOFWEEK - 7);
    }

    getNumEmptyDaysAtEnd() {
      return (DAYS_IN_WEEK - 1) - this.getEndDate().getDay();
    }

    getWeekCount() {
      const numDaysRoundedToWeek = this.props.numDays + this.getNumEmptyDaysAtStart() + this.getNumEmptyDaysAtEnd();
      return Math.ceil(numDaysRoundedToWeek / DAYS_IN_WEEK);
    }

    getWeekWidth() {
      return DAYS_IN_WEEK * this.getSquareSizeWithGutter();
    }

    getWidth() {
      return (this.getWeekCount() * this.getSquareSizeWithGutter()) - this.props.gutterSize + WEEK_LABEL_OFFSET + 2;
    }

    getHeight() {
      return this.getWeekWidth() + (this.getMonthLabelSize() - this.props.gutterSize) + 2;
    }

    getValueCache(values: any) {
      if (!values || !values.length) {
        return {};
      }

      return reduce(values, (memo: any, value: any) => {
        const date = convertToDate(value.date);
        const index = moment(date).diff(this.getStartDateWithEmptyDays(), 'days');

        memo[index] = {
          value,
          fill: this.props.fill(value),
          title: this.props.titleForValue ? this.props.titleForValue(index, value) : null,
          tooltipDataAttrs: this.getTooltipDataAttrsForValue(value),
        };
        return memo;
      }, {});
    }

    getValueForIndex(index: any) {
      if (this.state.valueCache[index]) {
        return this.state.valueCache[index].value;
      }
      return null;
    }

    getFillForIndex(index: any) {
      if (this.state.valueCache[index]) {
        return this.state.valueCache[index].fill;
      }
      return this.props.fill(null);
    }

    getTitleForIndex(index: any) {
      if (this.state.valueCache[index]) {
        return this.state.valueCache[index].title;
      }
      return this.props.titleForValue ? this.props.titleForValue(index) : null;
    }

    getTooltipDataAttrsForIndex(index: any) {
      if (this.state.valueCache[index]) {
        return this.state.valueCache[index].tooltipDataAttrs;
      }
      return this.getTooltipDataAttrsForValue({ date: null, count: null });
    }

    getTooltipDataAttrsForValue(value: any) {
      const { tooltipDataAttrs } = this.props;

      if (typeof tooltipDataAttrs === 'function') {
        return tooltipDataAttrs(value);
      }
      return tooltipDataAttrs;
    }

    getTransformForWeek(weekIndex: any) {
      if (this.props.horizontal) {
        return `translate(${weekIndex * this.getSquareSizeWithGutter()}, 0)`;
      }
      return `translate(0, ${weekIndex * this.getSquareSizeWithGutter()})`;
    }

    getTransformForMonthLabels() {
      if (this.props.horizontal) {
        return null;
      }
      return `translate(${this.getWeekWidth() + MONTH_LABEL_GUTTER_SIZE}, 0)`;
    }

    getTransformForAllWeeks() {
      if (this.props.horizontal) {
        return `translate(0, ${this.getMonthLabelSize()})`;
      }
      return null;
    }

    getViewBox() {
      if (this.props.horizontal) {
        return `-1 -1 ${this.getWidth()} ${this.getHeight()}`;
      }
      return `-1 -1 ${this.getHeight()} ${this.getWidth()}`;
    }

    getSquareCoordinates(dayIndex: any) {
      if (this.props.horizontal) {
        if (this.props.showWeekLabels) {
          return [WEEK_LABEL_OFFSET, dayIndex * this.getSquareSizeWithGutter()];
        } else {
          return [0, dayIndex * this.getSquareSizeWithGutter()];
        }
      }
      return [dayIndex * this.getSquareSizeWithGutter(), 0];
    }

    getMonthLabelCoordinates(weekIndex: any) {
      if (this.props.horizontal) {
        return [
          weekIndex * this.getSquareSizeWithGutter() + WEEK_LABEL_OFFSET,
          this.getMonthLabelSize() - MONTH_LABEL_GUTTER_SIZE,
        ];
      }
      const verticalOffset = -2;
      return [
        0,
        ((weekIndex + 1) * this.getSquareSizeWithGutter()) + verticalOffset,
      ];
    }

    getWeekLabelCoordinates(weekIndex: any) {
      if (this.props.showMonthLabels) {
        return [
          8,
          ((weekIndex + 2) * this.getSquareSizeWithGutter()) - 3 + MONTH_LABEL_GUTTER_SIZE
        ];
      }

      return [
        8,
        ((weekIndex + 1) * this.getSquareSizeWithGutter()) - 2
      ];
    }

    handleClick(value: any) {
      if (this.props.onClick) {
        this.props.onClick(value);
      }
    }

    renderSquare(dayIndex: any, index: any) {
      const indexOutOfRange =
        index < this.getNumEmptyDaysAtStart() ||
        index >= this.getNumEmptyDaysAtStart() + this.props.numDays;

      if (indexOutOfRange && !this.props.showOutOfRangeDays) {
        return null;
      }
      const [x, y] = this.getSquareCoordinates(dayIndex);

      var rect = document.createElementNS(svgns, 'rect');

      rect.setAttributeNS(null, 'key', index);
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
      rect.setAttributeNS(null, 'width', SQUARE_SIZE);
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
      rect.setAttributeNS(null, 'height', SQUARE_SIZE);
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
      rect.setAttributeNS(null, 'x', x);
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
      rect.setAttributeNS(null, 'y', y);

      const title = document.createElementNS(svgns, 'title');

      rect.appendChild(title);

      rect.setAttributeNS(null, 'fill', this.getFillForIndex(index));
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
      rect.setAttributeNS(null, 'y', y);

      sub(index, (e: any) => {
        if (e === 'leave') {
          rect.setAttributeNS(null, 'class', '');
        } else {
          rect.setAttributeNS(null, 'class', 'active');
        }
      });

      rect.onmouseover = () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        emit(index);

        // Lazy title parsing
        title.textContent = this.getTitleForIndex(index);
      };

      rect.onmouseleave = () => {
        emit(index, 'leave');
      };

      return rect;
    }

    renderWeek(weekIndex: any) {
      var rect = document.createElementNS(svgns, 'g');

      rect.setAttributeNS(null, 'key', weekIndex);
      rect.setAttributeNS(null, 'transform', this.getTransformForWeek(weekIndex));

      for (let i = 0; i < DAYS_IN_WEEK; i++) {
        var square = this.renderSquare(i, (weekIndex * DAYS_IN_WEEK) + i);

        if (square) {
          rect.appendChild(square);
        }
      }

      return rect;
    }

    renderAllWeeks() {
      return range(this.getWeekCount()).map(weekIndex => this.renderWeek(weekIndex));
    }

    renderMonthLabels() {
      if (!this.props.showMonthLabels) {
        return null;
      }
      const weekRange = range(this.getWeekCount() - 1);  // don't render for last week, because label will be cut off
      return weekRange.map((weekIndex) => {
        const endOfWeek = shiftDate(this.getStartDateWithEmptyDays(), (weekIndex + 1) * DAYS_IN_WEEK);
        const [x, y] = this.getMonthLabelCoordinates(weekIndex);

        if (endOfWeek.getDate() >= 1 && endOfWeek.getDate() <= DAYS_IN_WEEK) {
          var text = document.createElementNS(svgns, 'text');

          // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
          text.setAttributeNS(null, 'key', weekIndex);
          // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
          text.setAttributeNS(null, 'x', x);
          // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
          text.setAttributeNS(null, 'y', y);

          text.textContent = removeDots(dateFilter(endOfWeek, 'MMM'));
          return text;
        }

        return null;
      });
    }

    renderWeekLabels() {
      if (!this.props.showWeekLabels) {
        return null;
      }
      const weekRange = [1, 3, 5];  // don't render for last week, because label will be cut off
      return weekRange.map(weekIndex => {
        const [x, y] = this.getWeekLabelCoordinates(weekIndex);

        var text = document.createElementNS(svgns, 'text');

        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
        text.setAttributeNS(null, 'key', weekIndex);
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
        text.setAttributeNS(null, 'x', x);
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
        text.setAttributeNS(null, 'y', y);
        text.setAttributeNS(null, 'text-anchor', 'middle');

        text.textContent = $locale.DATETIME_FORMATS.SHORTDAY[(weekIndex + FIRSTDAYOFWEEK + 1) % 7].charAt(0);
        return text;
      });
    }

    render() {
      var svg = document.createElementNS(svgns, 'svg');
      svg.setAttributeNS(null, 'viewBox', this.getViewBox());

      var gLabels = document.createElementNS(svgns, 'g');
      var labels = this.getTransformForMonthLabels();
      if (labels) {
        gLabels.setAttributeNS(null, 'transform', labels);
      }

      var monthLabels = this.renderMonthLabels();
      if (monthLabels) {
        for (let i = 0; i < monthLabels.length; i++) {
          if (monthLabels[i]) {
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'SVGTextElement | null' is not as... Remove this comment to see the full error message
            gLabels.appendChild(monthLabels[i]);
          }
        }
      }

      var gWeeks = document.createElementNS(svgns, 'g');
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
      gWeeks.setAttributeNS(null, 'transform', this.getTransformForAllWeeks());

      var monthWeek = this.renderAllWeeks();
      for (let i = 0; i < monthWeek.length; i++) {
        if (monthWeek[i]) {
          gWeeks.appendChild(monthWeek[i]);
        }
      }

      var gWeekLabels = document.createElementNS(svgns, 'g');
      var weekLabels = this.renderWeekLabels();
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      for (let i = 0; i < weekLabels.length; i++) {
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        if (weekLabels[i]) {
          // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
          gWeekLabels.appendChild(weekLabels[i]);
        }
      }

      svg.appendChild(gLabels);
      svg.appendChild(gWeeks);
      svg.appendChild(gWeekLabels);

      svg.setAttributeNS(null, 'class', 'heat-map');

      return svg;
    }
  }

  return {
    restrict: 'E',
    scope: {
      data: '=',
      hue: '=',
      showMonthLabels: '=',
      max: '=',
      endDate: '='
    },
    link: (scope, element) => {
      function rainbow(n: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'max' does not exist on type 'IScope'.
        let step = Math.abs(Math.min(Math.abs(n), scope.max) / scope.max) * 100;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'hue' does not exist on type 'IScope'.
        return `hsl(${scope.hue},100%,${((100 - step) * 0.65) + 25}%)`;
      }

      let cal: any;

      scope.$watchGroup(['data', 'endDate'], render);

      function render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'IScope'.
        if (scope.data) {
          if (cal) {
            element.contents().remove();
          }

          cal = new CalendarHeatmap({
            numDays: 365,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'endDate' does not exist on type 'IScope'... Remove this comment to see the full error message
            endDate: scope.endDate,
            gutterSize: 1,
            horizontal: true,
            // @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
            showMonthLabels: angular.isDefined(scope.showMonthLabels) ? scope.showMonthLabels : true,
            showWeekLabels: true,
            showOutOfRangeDays: false,
            titleForValue: (index: any, value: any) => {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'endDate' does not exist on type 'IScope'... Remove this comment to see the full error message
              index = index - (scope.endDate.getDay() - 2 - (FIRSTDAYOFWEEK - 7));
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'endDate' does not exist on type 'IScope'... Remove this comment to see the full error message
              const date = dateFilter(moment(scope.endDate).subtract(365 - index, 'days').toDate(), 'mediumDate');
              let amount = value ? value.count : 0;

              amount = currency(
                intCurrency(
                  amount,
                  true,
                  // @ts-expect-error ts-migrate(2339) FIXME: Property 'dbCtrl' does not exist on type 'IScope'.
                  scope.$parent.dbCtrl.currencyDigits
                ),
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'dbCtrl' does not exist on type 'IScope'.
                scope.$parent.dbCtrl.currencySymbol,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'dbCtrl' does not exist on type 'IScope'.
                scope.$parent.dbCtrl.currencyDigits
              );

              return `${date}\n${amount}`;
            },
            fill: (value: any) => {
              let step;

              // @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
              if (value && angular.isNumber(value.count)) {
                step = rainbow(value.count);
              } else {
                step = '#efefef';
              }

              return step;
            },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'IScope'.
            values: scope.data
          });

          element[0].appendChild(cal.render());
        }
      }
    }
  };
});
