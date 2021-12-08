// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Settings', function () {
  let Settings: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(angular.mock.module('financier'));

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(inject((_Settings_: any) => {
    Settings = _Settings_;
  }));

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('new Settings()', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('can take existing settings', () => {
      let sets = new Settings({
        hints: {
          outflow: false
        }
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets.constructor.name).toBe('Settings');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('can take no constructor params', () => {
      let sets = new Settings();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets.constructor.name).toBe('Settings');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('exposes default settings', () => {
      let sets = new Settings();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets._id).toBe('settings');
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets.hints.outflow).toBe(true);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('set', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hints.outflow', () => {
      let sets = new Settings();

      sets.hints.outflow = false;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets.toJSON().hints.outflow).toBe(false);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('cannot set _id', () => {
      let sets = new Settings();

      sets._id = 123;
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets._id).not.toBe(123);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('pub/sub', () => {

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hints.outflow', () => {
      const foo = {
        change: () => {},
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let sets = new Settings({
        hints: {
          outflow: false
        }
      });

      sets.subscribe(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      sets.hints.outflow = true;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(sets);
    });

  });
});
