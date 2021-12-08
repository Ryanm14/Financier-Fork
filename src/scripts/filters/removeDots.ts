angular.module('financier').filter('removeDots', () => {
  return (str: any) => str.replace(/\./g, '');
});
