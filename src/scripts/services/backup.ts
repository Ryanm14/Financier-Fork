// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'file... Remove this comment to see the full error message
import fileSaver from 'file-saver';

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').factory('backup', (db: any, uuid: any, $filter: any, $translate: any, $q: any) => {
  const dateFilter = $filter('date');

  return {
    backup(budgetId: any) {
      db._pouch.allDocs({
        include_docs: true,
        startkey: `b_${budgetId}_`,
        endkey: `b_${budgetId}_\uffff`
      })
      .then((res: any) => res.rows.map((row: any) => {
        delete row.doc._rev;

        return row.doc;
      }))
      .then((docs: any) => {
        return db._pouch.get(`budget-opened_${budgetId}`)
        .then((doc: any) => {
          delete doc._rev;

          docs.unshift(doc);

          return docs;
        });
      })
      .then((docs: any) => {
        return db._pouch.get(`budget_${budgetId}`)
        .then((doc: any) => {
          delete doc._rev;

          const name = $translate.instant('BACKUP_NAME', {
            date: dateFilter(new Date(), 'short'),
            name: doc.name
          });
          doc.name = name;

          docs.unshift(doc);

          return [name, docs];
        });
      })
      // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'name' implicitly has an 'any' typ... Remove this comment to see the full error message
      .then(([name, docs]) => {
        const blob = new Blob([JSON.stringify(docs, null, 2)], {type: 'text/plain;charset=utf-8'});

        return fileSaver.saveAs(blob, `${name}.json`);
      });
    },
    restore(docs: any) {
      // Wrap to catch errors in promise
      return $q.resolve(docs)
      .then((docs: any) => {
        const budgetId = findBudgetId(docs);

        validate(budgetId, docs);

        return db._pouch.bulkDocs(copyDocs(budgetId, docs));
      });
    }
  };

  function validate(budgetId: any, docs: any) {
    if (!budgetId) {
      throw new Error('Could not find budgetId for budget.');
    }

    docs.forEach((doc: any) => {
      if (doc._id.indexOf(`b_${budgetId}_`) !== 0 &&
          doc._id.indexOf(`budget-opened_${budgetId}`) !== 0 &&
          doc._id.indexOf(`budget_${budgetId}`) !== 0) {
        throw new Error(`Doc _id '${doc._id}' does not match budgetId '${budgetId}'`);
      }
    });
  }

  function findBudgetId(docs: any) {
    let budgetId;

    docs.forEach((doc: any) => {
      if (doc._id.indexOf('budget_') === 0) {
        budgetId = doc._id.slice(7);
      }
    });

    return budgetId;
  }

  function copyDocs(budgetId: any, docs: any) {
    // Always create a new copy so importing doesn't overwrite
    const newBudgetId = uuid();

    return docs.map((doc: any) => {
      doc._id = doc._id.replace(`b_${budgetId}_`, `b_${newBudgetId}_`);
      doc._id = doc._id.replace(`budget-opened_${budgetId}`, `budget-opened_${newBudgetId}`);
      doc._id = doc._id.replace(`budget_${budgetId}`, `budget_${newBudgetId}`);

      return doc;
    });
  }
});
