angular.module('financier').controller('budgetsCtrl', function(
  this: any,
  $q,
  Budget,
  BudgetOpened,
  myBudgets,
  myBudgetsOpened,
  $scope,
  $http,
  db,
  ngDialog
) {
  this.budgets = myBudgets;
  this.budgetsOpened = myBudgetsOpened;

  const getBudgets = () => {
    $q.all([
      db.budgets.all(),
      db.budgetsOpened.all()
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'budgets' implicitly has an 'any' ... Remove this comment to see the full error message
    ]).then(([budgets, budgetsOpened]) => {
      this.budgets = budgets;
      this.budgetsOpened = budgetsOpened;
    });
  };

  this.budgetOrder = (budget: any) => this.budgetsOpened[budget.id] ? this.budgetsOpened[budget.id].opened : 0;

  function getId(_id: any) {
    return _id.slice(_id.lastIndexOf('_') + 1);
  }

  $scope.$on('reset', () => {
    getBudgets();
  });

  $scope.$on('pouchdb:change', (e: any, change: any) => {
    // if it's a Budget
    if (Budget.contains(change.id)) {

      // look through our budgets to see if it exists
      for (let i = 0; i < this.budgets.length; i++) {
        if (this.budgets[i]._id === change.id) {

          if (change.deleted) {
            this.budgets.splice(i, 1);
          } else {
            this.budgets[i].data = change.doc;
          }

          return;
        }
      }

      if (!change.deleted) {
        // Couldn't find it
        const b = new Budget(change.doc);
        b.subscribe(db.budgets.put);

        this.budgets.push(b);
      }
    } else if (BudgetOpened.contains(change.id)) {
      const id = getId(change.id);

      // look through our budgets to see if it exists
      if (this.budgetsOpened[id]) {

        if (change.deleted) {
          delete this.budgetsOpened[id];
        } else {
          this.budgetsOpened[id].data = change.doc;
        }

        return;
      }

      if (!change.deleted) {
        // Couldn't find it
        const b = new BudgetOpened(change.doc);
        b.subscribe(db.budgetsOpened.put);

        this.budgetsOpened[b.id] = b;
      }
    }
  });

  let removingBudget: any;

  this.isRemoving = (budget: any) => budget === removingBudget;

  this.removing = (budget: any, e: any) => {
    e.preventDefault();
    e.stopPropagation();

    removingBudget = budget;
  };

  this.remove = (budget: any) => {
    const recordsToRemove = [
      db.budget(budget.id).remove()
    ];

    if (this.budgetsOpened[budget.id]) {
      recordsToRemove.push(this.budgetsOpened[budget.id].remove());
    }

    $q.all(recordsToRemove)
    .then(() => {
      return budget.remove();
    })
    .then(() => {
      // TODO might not need to be done due to _changes work
      getBudgets();
    });
  };

  this.edit = (budget: any, e: any) => {
    e.preventDefault();
    e.stopPropagation();

    ngDialog.open({
      // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
      template: require('../../views/modal/editBudget.html'),
      controller: 'editBudgetCtrl as editBudgetCtrl',
      resolve: {
        budgetRecord: () => budget
      }
    });
  };

});
