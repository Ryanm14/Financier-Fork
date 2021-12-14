import {MonthCategory} from "./MonthCategory";
import {Account} from "./newAccount";
import {Month} from "./newMonth";
import {Transaction} from "./newTransaction";
import {MonthManager} from "./newMonthManager";

export class BudgetManager {
    private budgetId: string;
    private pouch: any;

    constructor(pouch: any, budgetId: string) {
        this.pouch = pouch;
        this.budgetId = budgetId;

        // Month.budgetId = budgetId;
        // const Account = account(budgetId);
        // const Category = category(budgetId);
        // const Transaction = transaction(budgetId);
        // const MasterCategory = masterCategory(budgetId);
        // const MonthManager = monthManager(budgetId);
        // const Payee = payee(budgetId);
    }

    budget_getAllMonthCategories() {
        return this.pouch.allDocs({
            include_docs: true,
            startkey: MonthCategory.startKey(this.budgetId),
            endkey: MonthCategory.endKey(this.budgetId)
        })
            .then((res: any) => {
                return res.rows.map((row: any) => {
                    const bValue = new MonthCategory(row.doc);
                    //TODO
                    // bValue.subscribe(put);

                    return bValue;
                });
            });
    }

    budget_getAllAccounts() {
        return this.pouch.allDocs({
            include_docs: true,
            startkey: Account.startKey(this.budgetId),
            endkey: Account.endKey
        })
            .then((res: any) => {
                return res.rows.map((row: any) => {
                    const acc = new Account(row.doc);
                    // acc.subscribe(put);

                    return acc;
                });
            });
    }

    budget_getAllTransactions() {
        return this.pouch.allDocs({
            include_docs: true,
            startkey: Transaction.startKey,
            endkey: Transaction.endKey
        })
            .then((res: any) => {
                const transactions: any = {};

                for (let i = 0; i < res.rows.length; i++) {
                    const trans = new Transaction(res.rows[i].doc);

                    // Add transaction splits
                    if (trans.splits.length) {
                        for (let j = 0; j < trans.splits.length; j++) {
                            transactions[trans.splits[j].id] = trans.splits[j];
                        }
                    }

                    transactions[trans.id] = trans;
                }

                return Object.keys(transactions).map(key => {
                    const trans = transactions[key];

                    if (trans.data.transfer) {
                        trans.transfer = transactions[trans.data.transfer];
                    }

                    return transactions[key];
                });
            });
    }

    budget_all() {
        return this.pouch.allDocs({
            include_docs: true, /* eslint camelcase:0 */
            startkey: Month.startKey,
            endkey: Month.endKey
        }).then((res: any) => {
            // const months = res.rows.map((row: any) => new Month(row.doc, put));
            const months = res.rows.map((row: any) => new Month(row.doc, () => {
            }));

            // const manager = new MonthManager(months, put);
            const manager = new MonthManager(months, () => {
            });

            return this.budget_getAllMonthCategories()
                .then((monthCatVals: MonthCategory[]) => {
                    for (let i = 0; i < monthCatVals.length; i++) {
                        manager.addMonthCategory(monthCatVals[i]);
                    }

                    return this.budget_getAllAccounts()
                        .then((accounts: Account[]) => {
                            for (let i = 0; i < accounts.length; i++) {
                                manager.addAccount(accounts[i]);
                            }

                            return this.budget_getAllTransactions()
                                .then((transactions: Transaction[]) => {
                                    for (let i = 0; i < transactions.length; i++) {
                                        manager.addTransaction(transactions[i]);
                                    }

                                    return manager;
                                });

                        });
                });
        });
    }

}
