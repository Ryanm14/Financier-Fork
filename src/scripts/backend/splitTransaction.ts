// @ts-ignore
import moment from 'moment';
import {Transaction} from "./newTransaction";
import angular from "angular";
import {v4 as uuidv4} from "uuid";

interface SplitTransactionData {
    id: string,
    value: number,
    category: string,
    memo: string,
    payee: any,
    transfer: any
}

/**
 * Represents a Transaction
 */
export class SplitTransaction {
    private transaction: Transaction;
    private id: string;
    private subscribeClearedValueChangeFn: any[];
    private subscribeUnclearedValueChangeFn: any[];
    private subscribeMonthChangeFn: any;
    private subscribeValueChangeFn: any;
    private subscribeCategoryChangeBeforeFn: any;
    private subscribeCategoryChangeAfterFn: any;
    private subscribePayeeChangeFn: any;

    /**
     * Create a Transaction.
     *
     * @param {object} [data] - The object record from the database.
     * @param {Transaction} transaction - The transaction that the split belongs to
     */
    constructor(transaction: Transaction, data: any) {
        const myData: SplitTransactionData = angular.merge({
            id: uuidv4(),
            value: 0,
            category: null,
            memo: null,
            payee: null,
            transfer: null
        }, data);

        this.transaction = transaction;

        // Ensure whole number
        myData.value = Math.round(myData.value);

        this.id = myData.id;

        this._data = myData;

        this.setMonth();

        this.transfer = null;

        this.subscribeClearedValueChangeFn = [];
        this.subscribeUnclearedValueChangeFn = [];
    }

    private _data: SplitTransactionData;

    get data() {
        return this._data;
    }

    set data(data) {
        // SET CATEGORY
        this._emitCategoryChange(() => {
            this._data.category = data.category;

            this.setMonth();
        });

        this._emitValueChange(data.value - this._data.value);

        this._data = data;
    }

    private _month: any;

    get month() {
        return this._month;
    }

    private _transfer: any;

    get transfer() {
        return this._transfer;
    }

    set transfer(transfer) {
        this._transfer = transfer;
    }

    get constructorName() {
        return 'SplitTransaction';
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

    set value(x: number) {
        const oldValue = this._data.value;
        this._data.value = x;

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

    // Pass through
    get date() {
        return this.transaction.date;
    }

    set date(d) {
        this.transaction.date = d;
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
     * The account the transaction is assigned to
     *
     * @type {string}
     */
    get account() {
        return this.transaction.account;
    }

    set account(s) {
        // You should never be able to set the account of a split transaction...
        // So let's just do nothing

        return;
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

    get fn() {
        return this.transaction.fn;
    }

    set fn(f) {
        this.transaction.fn = f;
    }

    _remove() {
        // this.transaction.removeSplit(this);
    }

    setMonth() {
        this._month = moment(this.date);

        if (this.category === 'incomeNextMonth') {
            this._month = this._month.add(1, 'month');
        }

        this._month = this._month.toDate();
    }

    _setDate(x: Date) {
        const splitOldMonth = this.month;
        this.transaction._setDate(x);
        this.setMonth();
        this._emitMonthChange(this.month, splitOldMonth);

    }

    _setDateFromParent(x: Date) {
        const oldMonth = this._month;
        this.setMonth();
        this._emitMonthChange(this.month, oldMonth);

        if (this.transfer) {
            this.transfer._setDate(x);
        }
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

    subscribeMonthChange(fn: any) {
        this.subscribeMonthChangeFn = fn;
    }

    _emitMonthChange(newMonth: any, oldMonth: any) {
        this.subscribeMonthChangeFn && this.subscribeMonthChangeFn(newMonth, oldMonth);
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
     * Used to set the function(s) to invoke upon value changes.
     *
     * @param {function} fn - This function will be invoked upon value
     * changes with the amount the value has changed as the first parameter,
     * but only when/if the value is uncleared.
     */
    subscribePayeeChange(fn: any) {
        this.subscribePayeeChangeFn = fn;
    }

    subscribeAccountChange() {
        // Do nothing -- no-op for Transaction vs SplitTransaction
        // (SplitTransactions do not care if the account changes)
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
        return this.fn && this.fn(this.transaction);
    }

    /**
     * Gracefully remove from db by marking `_deleted`.
     *
     * Mark any linked transfer as deleted, too.
     */
    remove() {
        if (this.transfer && !this.transfer._data._deleted) {
            this.transfer._data._deleted = true;

            this.transfer._emitChange();
        }

        // if (!this._data._deleted) {
        //   this._data._deleted = true;

        //   this._emitChange();
        // }
    }

    /**
     * Will serialize the Transaction object to
     * a JSON object for sending to the database.
     *
     * @returns {object}
     */
    toJSON() {
        return this._data;
    }
}
