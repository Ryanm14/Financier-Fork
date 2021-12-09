class FlagsCtrl {
  flags: Flag[];

  constructor(flags: Flag[]) {
    this.flags = flags;
  }
}

angular.module('financier').controller('flagCtrl',FlagsCtrl);
