import moment from 'moment';

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').directive('transactionEditor', ($timeout, $rootScope, payee, transaction, $stateParams, splitTransaction, ngDialog, Hotkeys) => {
  return {
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    template: require('./transactionEditor.html'),
    bindToController: {
      transaction: '='
    },
    controllerAs: 'transactionCtrl',
    controller: function ($scope) {
      const Payee = payee($stateParams.budgetId);
      const Transaction = transaction($stateParams.budgetId);
      const SplitTransaction = splitTransaction($stateParams.budgetId);

      // @ts-expect-error ts-migrate(2339) FIXME: Property '$onInit' does not exist on type 'IDirect... Remove this comment to see the full error message
      this.$onInit = function () {
        // Make completely new copy of split transactions for editing
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'splits' does not exist on type 'IDirecti... Remove this comment to see the full error message
        this.splits = this.transaction.splits.map((s: any) => initializeSplitEditor(s));

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'account' does not exist on type 'IDirect... Remove this comment to see the full error message
        this.account = this.transaction.account;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'flag' does not exist on type 'IDirective... Remove this comment to see the full error message
        this.flag = this.transaction.flag;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'date' does not exist on type 'IDirective... Remove this comment to see the full error message
        this.date = this.transaction.date;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'cleared' does not exist on type 'IDirect... Remove this comment to see the full error message
        this.cleared = this.transaction.cleared;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'checkNumber' does not exist on type 'IDi... Remove this comment to see the full error message
        this.checkNumber = this.transaction.checkNumber;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'payee' does not exist on type 'IDirectiv... Remove this comment to see the full error message
        this.payee = $scope.dbCtrl.payees[this.transaction.payee];
        
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'account' does not exist on type 'IDirect... Remove this comment to see the full error message
        $scope.$watch(() => this.account, (newAccount: any) => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'accountRecord' does not exist on type 'I... Remove this comment to see the full error message
          this.accountRecord = $scope.accountCtrl.manager.getAccount(newAccount);
        });
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
        if (this.transaction.transfer) {        
           // @ts-expect-error ts-migrate(2339) FIXME: Property 'payee' does not exist on type 'IDirectiv... Remove this comment to see the full error message
           this.payee = $scope.accountCtrl.manager.getAccount(this.transaction.transfer.account);
        }

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'IDirec... Remove this comment to see the full error message
        this.category = this.transaction.category;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'payee' does not exist on type 'IDirectiv... Remove this comment to see the full error message
        $scope.$watch(() => this.payee, (payee: any, oldPayee: any) => {
          if (payee !== oldPayee) {
            if (payee && payee.constructorName === 'Payee') {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'IDirec... Remove this comment to see the full error message
              if (!this.category) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'IDirec... Remove this comment to see the full error message
                this.category = payee.categorySuggest;
              }
            }
          }
        });

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'IDirec... Remove this comment to see the full error message
        $scope.$watch(() => this.category, (newCat: any, oldCat: any) => {
          if (newCat !== oldCat) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'splits' does not exist on type 'IDirecti... Remove this comment to see the full error message
            if (newCat === 'split' && !this.splits.length) {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'splits' does not exist on type 'IDirecti... Remove this comment to see the full error message
              this.splits = [
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
                new SplitTransaction(this.transaction).toJSON(),
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
                new SplitTransaction(this.transaction).toJSON()
              ];
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'splits' does not exist on type 'IDirecti... Remove this comment to see the full error message
              this.splits[0].value = createValueGetterSetter(this.splits[0].value);
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'splits' does not exist on type 'IDirecti... Remove this comment to see the full error message
              this.splits[1].value = createValueGetterSetter(this.splits[1].value);
            } else {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'splits' does not exist on type 'IDirecti... Remove this comment to see the full error message
              this.splits = [];
            }
          }
        });

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'memo' does not exist on type 'IDirective... Remove this comment to see the full error message
        this.memo = this.transaction.memo;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'IDirectiv... Remove this comment to see the full error message
        this.value = createValueGetterSetter(this.transaction.value);

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'submit' does not exist on type 'IDirecti... Remove this comment to see the full error message
        this.submit = () => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'splits' does not exist on type 'IDirecti... Remove this comment to see the full error message
          if (this.splits.length && !validateSplits(this.value.value, this.splits)) {
            ngDialog.open({
              // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
              template: require('../../../views/modal/splitNotEqual.html'),
              controller: 'cancelClickCtrl'
            });

            throw new Error('Splits do not add up');
          }

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
          if (this.transaction.transfer && this.transaction.transfer.constructorName === 'SplitTransaction') {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'IDirectiv... Remove this comment to see the full error message
            if (this.value.value !== this.transaction.value) {
              ngDialog.open({
                // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
                template: require('../../../views/modal/noChangeValueSplitTransfer.html'),
                controller: 'cancelClickCtrl'
              });

              throw new Error('Split transfer value change attempt');
            }

            // @ts-expect-error ts-migrate(2339) FIXME: Property 'payee' does not exist on type 'IDirectiv... Remove this comment to see the full error message
            if (this.payee.id !== this.transaction.transfer.account) {
              ngDialog.open({
                // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
                template: require('../../../views/modal/noChangePayeeSplitTransfer.html'),
                controller: 'cancelClickCtrl'
              });

              throw new Error('Split transfer payee change attempt');
            }
          }

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'splits' does not exist on type 'IDirecti... Remove this comment to see the full error message
          if (this.splits.length) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'payee' does not exist on type 'IDirectiv... Remove this comment to see the full error message
            if (this.payee.constructorName === 'Account') {
              ngDialog.open({
                // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
                template: require('../../../views/modal/noTransferAndSplit.html'),
                controller: 'cancelClickCtrl'
              });

              throw new Error('Split transaction cannot also be transfer');
            }
          }

          // Attempt reference to account and transferAccount
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'account' does not exist on type 'IDirect... Remove this comment to see the full error message
          const account = $scope.accountCtrl.manager.getAccount(this.account);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'payee' does not exist on type 'IDirectiv... Remove this comment to see the full error message
          const transferAccount = $scope.accountCtrl.manager.getAccount(this.payee.id);

          // Remove the emit change handle to prevent 409 conflicts
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
          const saveFn = this.transaction.fn || $scope.accountCtrl.manager.saveFn;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
          this.transaction.fn = null;

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
          if (this.transaction.transfer) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
            this.transaction.transfer.fn = null;
          }

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
          this.transaction.splits.forEach((s: any) => {
            if (s.transfer) {
              s.transfer.fn = null;
            }
          });

          // Save all relevant data
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
          this.transaction.account = this.account;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
          this.transaction.flag = this.flag;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
          this.transaction.date = this.date;

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
          saveCategory(this.transaction, this.category, account, transferAccount);

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
          this.transaction.memo = this.memo;

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
          this.transaction.cleared = this.cleared;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
          this.transaction.checkNumber = this.checkNumber;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
          this.transaction.value = this.value.value || 0;

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
          savePayee(this.transaction, this.payee, account, transferAccount);

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
          this.transaction.splits = this.splits.map((s: any) => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
            return createSplitTransaction(new SplitTransaction(this.transaction), s);
          });

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
          if (!$scope.accountCtrl.manager.transactions[this.transaction.id]) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
            $scope.accountCtrl.manager.addTransaction(this.transaction);
          }

          // Save transaction
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
          this.transaction.fn = saveFn;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
          this.transaction._emitChange();

          // Save transaction's transfer, if exists
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
          if (this.transaction.transfer) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
            this.transaction.transfer.fn = saveFn;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
            this.transaction.transfer._emitChange();
          }

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
          for (let i = 0; i < this.transaction.splits.length; i++) {
            // Save transaction splits's transfer(s), if exists
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
            if (this.transaction.splits[i].transfer) {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
              this.transaction.splits[i].transfer.fn = saveFn;
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
              this.transaction.splits[i].transfer._emitChange();
            }
          }
        };

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'addSplit' does not exist on type 'IDirec... Remove this comment to see the full error message
        this.addSplit = () => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'transaction' does not exist on type 'IDi... Remove this comment to see the full error message
          const split = new SplitTransaction(this.transaction).toJSON();
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'splits' does not exist on type 'IDirecti... Remove this comment to see the full error message
          this.splits.push(split);
          split.value = createValueGetterSetter(split.value);

          $timeout(() => {
            $rootScope.$broadcast('split:new');
          });
        };

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'removeSplit' does not exist on type 'IDi... Remove this comment to see the full error message
        this.removeSplit = (split: any) => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'splits' does not exist on type 'IDirecti... Remove this comment to see the full error message
          const index = this.splits.indexOf(split);

          if (split !== -1) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'splits' does not exist on type 'IDirecti... Remove this comment to see the full error message
            this.splits.splice(index, 1);
          }

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'splits' does not exist on type 'IDirecti... Remove this comment to see the full error message
          if (!this.splits.length) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'IDirec... Remove this comment to see the full error message
            this.category = null;
          }
        };

        function saveCategory(transaction: any, category: any, account: any, transferAccount: any) {
          if (!account || account.onBudget) {
            if (transferAccount && transferAccount.onBudget) {
              transaction.category = null;
            } else {
              transaction.category = category;
            }
          } else {
            transaction.category = null;
          }
        }

        function validateSplits(value: any, splits: any) {
          return value === splits.reduce(((prev: any, curr: any) => prev + curr.value.value), 0);
        }

        function savePayee(transaction: any, payee: any, account: any, transferAccount: any) {
          if (payee.constructorName === 'Payee') {

            if (payee.id !== transaction.payee) {
              addPayee(transaction, payee);
            }

          } else if (payee.constructorName === 'Account') {
            if (transaction.payee) {
              removePayee(transaction);
            }

            if (transaction.transfer) {
              transaction.transfer.account = payee.id;
            } else {
              // Need to create transfer transaction
              transaction.transfer = new Transaction({
                value: -transaction.value,
                date: moment(transaction.date).format('YYYY-MM-DD'),
                account: payee.id,
                transfer: transaction.id,
                memo: transaction.memo,
                category: null
              });

              if (!transferAccount || transferAccount.onBudget) {
                if (account && account.onBudget) {
                  transaction.transfer.category = null;
                } else {
                  transaction.transfer.category = transaction.category;
                }
              } else {
                transaction.transfer.category = null;
              }

              transaction._data.transfer = transaction.transfer.id;

              transaction.transfer.transfer = transaction;

              $scope.accountCtrl.manager.addTransaction(transaction.transfer);
            }
          } else if (!payee) {
            removeTransfer(transaction);

            if (transaction.payee) {
              removePayee(transaction);
            }

            transaction.payee = null;

          // @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
          } else if (angular.isString(payee)) {
            // Find existing in use case where using same payee name for multiple split
            // transactions on one that doesn't currently exist

            const existingPayee = findPayeeByName(payee);

            if (existingPayee) {
              // One already exists
              if (existingPayee.id !== transaction.payee) {
                addPayee(transaction, existingPayee);
              }
            } else {
              // Does not exist
              const newPayee = new Payee({
                name: payee,
                categorySuggest: transaction.category
              });

              addPayee(transaction, newPayee);

              $scope.dbCtrl.payees[newPayee.id] = newPayee;
              $scope.accountCtrl.myBudget.put(newPayee);
              newPayee.subscribe($scope.accountCtrl.myBudget.put);
            }
          }
        }

        function findPayeeByName(payeeName: any) {
          for (let id in $scope.dbCtrl.payees) {
            if ($scope.dbCtrl.payees[id].name === payeeName) {
              return $scope.dbCtrl.payees[id];
            }
          }
        }

        function initializeSplitEditor(split: any) {
          // @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
          const data = angular.copy(split.toJSON());

          data.value = createValueGetterSetter(split.value);

          data.payee = $scope.dbCtrl.payees[split.payee];
          data.oldPayee = split.payee;


          if (split.transfer) {        
             data.payee = $scope.accountCtrl.manager.getAccount(split.transfer.account);
          }

          return data;
        }

        function createSplitTransaction(split: any, data: any) {
          split.data.id = data.id;
          split.id = data.id;
          split.payee = data.oldPayee;

          split.transfer = $scope.accountCtrl.manager.transactions[data.transfer];
          split.data.transfer = data.transfer;
          if (split.transfer) {
            split.transfer.fn = null;
          }

          split.memo = data.memo;
          split.value = data.value.value || 0;

          // Attempt reference to account and transferAccount
          const account = $scope.accountCtrl.manager.getAccount(split.account);
          const transferAccount = $scope.accountCtrl.manager.getAccount(data.payee.id);

          saveCategory(split, data.category, account, transferAccount);
          savePayee(split, data.payee, account, transferAccount);

          return split;
        }

        function addPayee(transaction: any, payee: any) {
          removeTransfer(transaction);

          if (transaction.payee) {
            removePayee(transaction);
          }

          transaction.payee = payee.id;

          payee.categorySuggest = transaction.category;
        }

        function removePayee(transaction: any) {
          const transactions = Object.keys($scope.accountCtrl.manager.transactions).map(k => {
            return $scope.accountCtrl.manager.transactions[k];
          });

          for (let i = 0; i < transactions.length; i++) {
            if (transactions[i].payee === transaction.payee &&
                transactions[i].id !== transaction.id) {
              transaction.payee = null;

              return;
            }
          }

          if ($scope.dbCtrl.payees[transaction.payee] && !$scope.dbCtrl.payees[transaction.payee].internal) {
            $scope.dbCtrl.payees[transaction.payee].remove();
            delete $scope.dbCtrl.payees[transaction.payee];

            transaction.payee = null;
          }
        }

        function removeTransfer(transaction: any) {
          if (transaction.transfer) {
            transaction.transfer.transfer = null;

            $scope.accountCtrl.manager.removeTransaction(transaction.transfer);
            transaction.transfer.remove();

            $scope.accountCtrl.myBudget.put(transaction.transfer);

            transaction.transfer = null;
          }

          if (transaction._data.transfer) {
            transaction._data.transfer = null;
          }
        }

        function createValueGetterSetter(initialValue: any) {
          return {
            value: initialValue,
            get outflow() {
              if (this.value < 0) {
                return Math.abs(this.value);
              }
            },
            set outflow(v) {
              // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
              this.value = -v;
            },
            get inflow() {
              if (this.value > 0) {
                return this.value;
              }
            },
            set inflow(v) {
              this.value = v;
            }
          };
        }

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'submitAndAddAnother' does not exist on t... Remove this comment to see the full error message
        this.submitAndAddAnother = () => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'submit' does not exist on type 'IDirecti... Remove this comment to see the full error message
          this.submit();
          $rootScope.$broadcast('transaction:create');
        };

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'submitAndAddAnother' does not exist on t... Remove this comment to see the full error message
        $scope.$on('submit', this.submitAndAddAnother);

        const hotkeys = Hotkeys.createHotkey({
            key: 'escape',
            callback: () => {
              $scope.accountCtrl.stopEditing();
            }
        });

        // Register hotkeys object
        Hotkeys.registerHotkey(hotkeys);

        $scope.$on('$destroy', () => {
          Hotkeys.deregisterHotkey(hotkeys);
        });
      };

    }
  };
});
