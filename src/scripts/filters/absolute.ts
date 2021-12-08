angular.module('financier').filter('absolute', () => {
  return (val: any) => Math.abs(val);
});
