import angular from "angular";

// const SplitTransaction = splitTransaction(budgetId);
import {v4 as uuidv4} from "uuid";
// @ts-ignore
import moment from 'moment';
import {SplitTransaction} from "./splitTransaction";

interface TransactionData {
    _deleted: boolean;
    _rev: any;
    _id: string,
    value: number,
    date: string,
    category: string,
    account: string,
    memo: string,
    cleared: boolean,
    reconciled: boolean,
    flag: any,
    payee: any,
    transfer: any,
    splits: any[],
    checkNumber: string
}


/**
 * Represents a Transaction
 */
export class Transaction {
    private static budgetId: any;
    id: string;
    fn: any;
    removeTransaction: any;
    addTransaction: any;
    private subscribeClearedValueChangeFn: any[];
    private subscribeUnclearedValueChangeFn: any[];
    private subscribeValueChangeFn: any;
    private subscribeAccountChangeFn: any;
    private subscribeMonthChangeFn: any;
    private subscribeCategoryChangeBeforeFn: any;
    private subscribeCategoryChangeAfterFn: any;
    private subscribePayeeChangeFn: any;

    /**
     * Create a Transaction.
     *
     * @param {object} [data] - The object record from the database.
     */
    constructor(data: any) {
        const myData = angular.merge({
            _id: Transaction.prefix + uuidv4(),
            value: 0,
            date: null,
            category: null,
            account: null,
            memo: null,
            cleared: false,
            reconciled: false,
            flag: null,
            payee: null,
            transfer: null,
            splits: [],
            checkNumber: null
        }, data);

        // Ensure whole number
        myData.value = Math.round(myData.value);

        this.id = myData._id.slice(myData._id.lastIndexOf('_') + 1);

        if (myData.date) {
            if (myData.date.length !== 10) {
                myData.date = myData.date.substring(0, 10);
            }

            this._date = moment(myData.date).toDate();
        }

        this.subscribeClearedValueChangeFn = [];
        this.subscribeUnclearedValueChangeFn = [];

        this._data = myData;

        this.setMonth();

        this.transfer = null;

        this._splits = myData.splits.map((s: any) => new SplitTransaction(this, s));
    }

    /**
     * The upper bound of alphabetically sorted Transactions by ID. Used by PouchDB.
     *
     * @type {string}
     */
    static get startKey() {
        return `b_${this.budgetId}_transaction_`;
    }

    /**
     * The lower bound of alphabetically sorted Transactions by ID. Used by PouchDB.
     *
     * @type {string}
     */
    static get endKey() {
        return this.startKey + '\uffff';
    }

    /**
     * The prefix for namespacing the Transaction UID
     *
     * @type {string}
     */
    static get prefix() {
        return this.startKey;
    }

    private _date: Date | undefined;

    /**
     * The date of the transaction.
     * Will call subscriber when changes.
     *
     * @type {date}
     */
    get date(): Date {
        if (!this._date) {
            return new Date();
        }
        return this._date;
    }

    set date(x: Date) {
        this._setDate(x);

        if (this.transfer) {
            this.transfer._setDate(x);
        }

        this.splits.forEach((s: any) => {
            s._setDateFromParent(x);
        });
    }

    private _data: TransactionData;

    get data() {
        return this._data;
    }

    set data(data) {
        this.splits = data.splits.map(s => new SplitTransaction(this, s));

        // SET CATEGORY
        this._emitCategoryChange(() => {
            this._data.category = data.category;

            this.setMonth();
        });

        // SET VALUE
        if (data.cleared || data.reconciled) {
            this._emitClearedValueChange(data.value - this._data.value);
        } else {
            this._emitUnclearedValueChange(data.value - this._data.value);
        }

        this._emitValueChange(data.value - this._data.value);

        // SET CLEARED
        if ((data.cleared || data.reconciled) !== this.cleared) {
            if (data.cleared || data.reconciled) {
                this._emitUnclearedValueChange(-data.value);
                this._emitClearedValueChange(data.value);
            } else {
                this._emitClearedValueChange(-data.value);
                this._emitUnclearedValueChange(data.value);
            }
        }

        // SET ACCOUNT
        this._emitAccountChange(data.account, this._data.account);


        // SET DATE
        const oldDate = this.month;
        this._date = moment(data.date).toDate();
        this._date?.setHours(0, 0, 0, 0);
        this.setMonth();
        this._emitMonthChange(this.month, oldDate);

        // this.splits.forEach(s => {
        //   split._emitMonthChange(this.month, oldDate);
        // });

        // TODO payee

        this._data = data;
    }

    private _splits: any;

    get splits() {
        return this._splits;
    }

    set splits(sArr) {
        let i = 0;
        while (i < this._splits.length) {
            if (sArr[i] && sArr[i].id === this._splits[i].id) {
                this._splits[i].data = sArr[i].data;
                this._splits[i].transfer = sArr[i].transfer;

                i++;
            } else {
                // doesn't exist in order, must have been removed
                if (this._splits[i].transfer) {
                    this.removeTransaction && this.removeTransaction(this._splits[i].transfer);
                }

                this.removeTransaction && this.removeTransaction(this._splits[i]);
                this.removeSplit(this._splits[i]);
                // i will be 'incremented' by removing in place
            }
        }

        // if we have additional
        while (i < sArr.length) {
            this.addSplit(sArr[i])
            this.addTransaction && this.addTransaction(sArr[i]);

            i++;
        }
    }

    private _transfer: any;

    get transfer() {
        return this._transfer;
    }

    set transfer(transfer) {
        this._transfer = transfer;
    }

    private _month: any;

    get month() {
        return this._month;
    }

    get constructorName() {
        return '';
    }

    /**
     * The currency value of the transaction.
     * Will call record, value and cleared or uncleared (depending on state
     * of `cleared`) subscribers upon change.
     *
     * Negative value = outflow, positive = inflow.
     *
     * @type {currency}
     */
    get value() {
        return this._data.value;
    }

    set value(x) {
        const oldValue = this._data.value;
        this._data.value = x;

        if (this.cleared) {
            this._emitClearedValueChange(x - oldValue);
        } else {
            this._emitUnclearedValueChange(x - oldValue);
        }

        this._emitValueChange(x - oldValue);

        this._emitChange();

        if (this.transfer) {
            const transOldValue = this.transfer._data.value;
            this.transfer._data.value = -x;

            if (this.transfer.cleared) {
                this.transfer._emitClearedValueChange(-x - transOldValue);
            } else {
                this.transfer._emitUnclearedValueChange(-x - transOldValue);
            }

            this.transfer._emitValueChange(-x - transOldValue);

            this.transfer._emitChange();
        }
    }

    get payee() {
        return this._data.payee;
    }

    set payee(payee) {
        if (payee !== this._data.payee) {
            this._data.payee = payee;

            this._emitChange();
        }
    }

    get outflow() {
        if (this.value < 0) {
            return Math.abs(this.value);
        }
        return 0;
    }

    set outflow(v: number) {
        this.value = -v;
    }

    get inflow() {
        if (this.value > 0) {
            return this.value;
        }
        return 0;
    }

    set inflow(v: number) {
        this.value = v;
    }

    /**
     * The category the transaction is assigned to.
     * Will call record and category subscribers when changes.
     *
     * @type {string}
     */
    get category() {
        return this._data.category;
    }

    set category(x) {
        this._emitCategoryChange(() => {
            this._data.category = x;

            this.setMonth();
        });

        this._emitChange();
    }

    /**
     * The account the transaction is assigned to.
     * Will call subscriber when changes.
     *
     * @type {string}
     */
    get account() {
        return this._data.account;
    }

    set account(x: string) {
        const oldAccount = this._data.account;
        this._data.account = x;

        this._emitAccountChange(x, oldAccount);
        this._emitChange();
    }

    /**
     * A user-entered memo for the transaction.
     * Will call subscriber when changes.
     *
     * @type {string}
     */
    get memo() {
        return this._data.memo;
    }

    set memo(x) {
        this._data.memo = x;

        if (this.transfer) {
            this.transfer.data.memo = x;

            this.transfer._emitChange();
        }

        this._emitChange();
    }

    /**
     * A user-entered check number for the transaction.
     * Will call subscriber when changes.
     *
     * Note: This is a string even though it's a
     * "check number" to be flexible
     *
     * @type {string}
     */
    get checkNumber() {
        return this._data.checkNumber;
    }

    set checkNumber(x) {
        this._data.checkNumber = x;

        this._emitChange();
    }

    /**
     * Whether the transaction is cleared.
     * Will call subscriber if changes.
     *
     * Will also call cleared and uncleared subscribers
     * with the inverse of the current `value` (swapping the value
     * from cleared to uncleared or vice versa).
     *
     * If transaction is reconciled, it's implicitly cleared
     *
     * @type {boolean}
     */
    get cleared() {
        return this._data.cleared || this.reconciled;
    }

    set cleared(x) {
        // Don't do anything if it's the same
        // If reconciled, cannot change cleared status
        if (x === this.cleared || this.reconciled) {
            return;
        }

        if (x) {
            this._emitUnclearedValueChange(-this.value);
            this._emitClearedValueChange(this.value);
        } else {
            this._emitClearedValueChange(-this.value);
            this._emitUnclearedValueChange(this.value);
        }

        this._data.cleared = x;

        this._emitChange();
    }

    /**
     * Whether the transaction has been reconciled or not
     *
     * A transaction should always be cleared if it has been reconciled
     *
     * @example
     * const trans = new Transaction();
     * trans.reconciled = true
     *
     * @type {boolean}
     */
    get reconciled() {
        return this._data.reconciled;
    }

    set reconciled(x) {
        if (x !== this._data.reconciled) {
            this._data.reconciled = x;

            this._emitChange();
        }
    }

    /**
     * The color of the transaction flag.
     *
     * @example
     * const trans = new Transaction();
     * trans.flag = '#ff0000'
     *
     * @type {color}
     */
    get flag() {
        return this._data.flag;
    }

    set flag(x) {
        this._data.flag = x;

        this._emitChange();
    }

    /**
     * The complete transaction ID, including namespacing.
     *
     * @type {string}
     */
    get _id() {
        return this._data._id;
    }

    set _rev(r: any) {
        this.data._rev = r;
    }

    /**
     * Used for detecting if a document's _id is a Transaction
     * in this budget.
     *
     * @param {string} _id - The document's _id
     * @returns {boolean} True if document _id is in the budget
     * as a Transaction.
     */
    static contains(_id: string) {
        return _id > this.startKey && _id < this.endKey;
    }

    addSplit(split: any) {
        this._splits.push(split);
    }

    removeSplit(split: any) {
        const index = this._splits.indexOf(split);

        if (index !== -1) {
            this._splits.splice(index, 1);
        }
    }

    _setDate(x: Date) {
        this._data.date = moment(x).format('YYYY-MM-DD');
        const oldDate = this.month;
        this._date = x;
        this._date?.setHours(0, 0, 0, 0);

        this.setMonth();

        this._emitMonthChange(this.month, oldDate);
        this._emitChange();
    }

    setMonth() {
        this._month = moment(this._date);

        if (this.category === 'incomeNextMonth') {
            this._month = this._month.add(1, 'month');
        }

        this._month = this._month.toDate();
    }

    /**
     * Used to set the function to invoke upon record changes.
     *
     * @param {function} fn - This function will be invoked upon record
     * changes with the Transaction object as the first parameter.
     */
    subscribe(fn: any) {
        this.fn = fn;
    }

    /**
     * Used to set the function to invoke upon uncleared value changes.
     *
     * Can only accept one value change fn, and will overwrite the previous
     * one.
     *
     * @param {function} fn - This function will be invoked upon value
     * changes with the amount the value has changed as the first parameter.
     */
    subscribeValueChange(fn: any) {
        this.subscribeValueChangeFn = fn;
    }

    subscribeAccountChange(fn: any) {
        this.subscribeAccountChangeFn = fn;
    }

    _emitAccountChange(newAccount: string, oldAccount: string) {
        this.subscribeAccountChangeFn && this.subscribeAccountChangeFn(newAccount, oldAccount);
    }

    subscribeMonthChange(fn: any) {
        this.subscribeMonthChangeFn = fn;
    }

    _emitMonthChange(newMonth: any, oldMonth: any) {
        this.subscribeMonthChangeFn && this.subscribeMonthChangeFn(newMonth, oldMonth);
    }

    subscribeCategoryChange(beforeFn: any, afterFn: any) {
        this.subscribeCategoryChangeBeforeFn = beforeFn;
        this.subscribeCategoryChangeAfterFn = afterFn;
    }

    _emitCategoryChange(fn: any) {
        this.subscribeCategoryChangeBeforeFn && this.subscribeCategoryChangeBeforeFn();
        fn();
        this.subscribeCategoryChangeAfterFn && this.subscribeCategoryChangeAfterFn();
    }

    /**
     * Used to set the function(s) to invoke upon cleared value changes.
     *
     * @param {function} fn - This function will be invoked upon value
     * changes with the amount the value has changed as the first parameter,
     * but only when/if the value is cleared.
     */
    subscribeClearedValueChange(fn: any) {
        this.subscribeClearedValueChangeFn.push(fn);
    }

    /**
     * Used to unset the function to invoke upon cleared value changes.
     *
     * @param {function} fn - The function reference originally provided
     * to subscribeClearedValueChange.
     */
    unsubscribeClearedValueChange(fn: any) {
        const index = this.subscribeClearedValueChangeFn.indexOf(fn);

        if (index > -1) {
            this.subscribeClearedValueChangeFn.splice(index, 1);
        } else {
            throw new Error('Subscriber does not exist');
        }
    }

    /**
     * Used to unset the function to invoke upon uncleared value changes.
     *
     * @param {function} fn - The function reference originally provided
     * to subscribeUnclearedValueChange.
     */
    unsubscribeUnclearedValueChange(fn: any) {
        const index = this.subscribeUnclearedValueChangeFn.indexOf(fn);

        if (index > -1) {
            this.subscribeUnclearedValueChangeFn.splice(index, 1);
        } else {
            throw new Error('Subscriber does not exist');
        }
    }

    /**
     * Used to set the function(s) to invoke upon value changes.
     *
     * @param {function} fn - This function will be invoked upon value
     * changes with the amount the value has changed as the first parameter,
     * but only when/if the value is uncleared.
     */
    subscribeUnclearedValueChange(fn: any) {
        this.subscribeUnclearedValueChangeFn.push(fn);
    }

    /**
     * Used to set the function(s) to invoke upon value changes.
     *
     * @param {function} fn - This function will be invoked upon value
     * changes with the amount the value has changed as the first parameter,
     * but only when/if the value is uncleared.
     */
    subscribePayeeChange(fn: any) {
        this.subscribePayeeChangeFn = fn;
    }

    /**
     * Will call the subscribed value function, if it exists, with how much
     * the value has changed by.
     *
     * @private
     */
    _emitPayeeChange(newPayee: any, oldPayee: any) {
        return this.subscribePayeeChangeFn && this.subscribePayeeChangeFn(newPayee, oldPayee);
    }

    /**
     * Will call the subscribed value function, if it exists, with how much
     * the value has changed by.
     *
     * @private
     */
    _emitValueChange(val: any) {
        return this.subscribeValueChangeFn && this.subscribeValueChangeFn(val);
    }

    /**
     * Will call the subscribed value function, if it exists, with how much
     * the cleared value has changed by.
     *
     * @private
     */
    _emitClearedValueChange(val: any) {
        for (let i = 0; i < this.subscribeClearedValueChangeFn.length; i++) {
            this.subscribeClearedValueChangeFn[i](val);
        }
    }

    /**
     * Will call the subscribed value function, if it exists, with how much
     * the uncleared value has changed by.
     *
     * @private
     */
    _emitUnclearedValueChange(val: any) {
        for (let i = 0; i < this.subscribeUnclearedValueChangeFn.length; i++) {
            this.subscribeUnclearedValueChangeFn[i](val);
        }
    }

    /**
     * Will call the subscribed function, if it exists, with self.
     *
     * @private
     */
    _emitChange() {
        return this.fn && this.fn(this);
    }

    /**
     * Gracefully remove from db by marking `_deleted`.
     *
     * Mark any linked transfer as deleted, too.
     */
    remove() {
        this.splits.forEach((split: any) => {
            split.remove();
        });

        if (this.transfer && !this.transfer._data._deleted) {
            this.transfer._data._deleted = true;

            this.transfer._emitChange();
        }

        if (!this._data._deleted) {
            this._data._deleted = true;

            this._emitChange();
        }
    }

    /**
     * Will serialize the Transaction object to
     * a JSON object for sending to the database.
     *
     * @returns {object}
     */
    toJSON() {
        this._data.splits = this.splits.map((s: any) => s.toJSON());

        return this._data;
    }
}
