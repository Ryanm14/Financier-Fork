import PouchDB from 'pouchdb';
import {Budget} from "./newBudget";
import {BudgetOpened} from "./newBudgetOpened";

export class NewDB {
    private static instance: NewDB | null = null
    private db: any

    private constructor() {
        this.db = new PouchDB('fin', {
            // adapter: that.adapter,
            size: 50,
            auto_compaction: true
        });
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = new NewDB();
        }
        return this.instance;
    }

    all() {
        return this.db.allDocs({
            include_docs: true, /* eslint camelcase:0 */
            startkey: Budget.startKey,
            endkey: Budget.endKey
        }).then((res: any) => {
            const budgets = [];
            for (let i = 0; i < res.rows.length; i++) {

                const put = (budget: any) => {
                    return this.db.put(budget.toJSON()).then((res: any) => {
                        budget._rev = res.rev;
                    });
                }

                const budget = new Budget(res.rows[i].doc);
                budget.subscribe(put);

                budgets.push(budget);
            }

            return budgets;
        });
    }

    allBudgetsOpened() {
        return this.db.allDocs({
            include_docs: true, /* eslint camelcase:0 */
            startkey: BudgetOpened.startKey,
            endkey: BudgetOpened.endKey
        }).then((res: any) => {
            const budgetsOpened = {};

            for (let i = 0; i < res.rows.length; i++) {

                const budgetOpened = new BudgetOpened(res.rows[i].doc);

                const put = (budget: any) => {
                    return this.db.put(budget.toJSON()).then((res: any) => {
                        budget._rev = res.rev;
                    });
                }

                budgetOpened.subscribe(put);

                // @ts-ignore
                budgetsOpened[budgetOpened.id] = budgetOpened;
            }


            return budgetsOpened;
        });
    }
}
