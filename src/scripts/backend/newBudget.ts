import {v4 as uuidv4} from 'uuid';
import angular from "angular";

interface BudgetData {
    hintsOutflow: boolean,
    name: string,
    currency: string,
    id: string,
    created: string,
    checkNumber: boolean,
    rev: string,
    deleted: boolean
}

/**
 * Represents a Budget project
 */
export class Budget {

    private fn: any;
    readonly id: string;
    private DEFAULT_BUDGET: BudgetData = {
        hintsOutflow: true,
        name: '',
        currency: 'USD',
        id: 'budget_' + uuidv4(),
        created: new Date().toISOString(),
        checkNumber: false,
        rev: '',
        deleted: false
    };

    /**
     * Create a Budget
     *
     * @param rawData The record object from the database
     */
    constructor(rawData: BudgetData | any) {
        rawData = Budget.migrateToNewBudget(rawData);

        this._data = angular.merge(this.DEFAULT_BUDGET, rawData);

        // Get the non-namespaced budget UID.
        this.id = this.data.id.slice(this.data.id.lastIndexOf('_') + 1);
    }

    private _data: BudgetData;

    /**
     * When a new change comes in from the _changes Pouch/Couch feed,
     * update the raw record data through this getter/setter so that we
     * have a chance to intercept it
     *
     * @type {object}
     */
    get data() {
        return this._data;
    }

    /**
     * The upper bound of alphabetically sorted Budgets by ID. Used by PouchDB.
     *
     * @type {string}
     */
    static get startKey() {
        return 'budget_';
    }

    /**
     * The lower bound of alphabetically sorted Budgets by ID. Used by PouchDB.
     *
     * @type {string}
     */
    static get endKey() {
        return this.startKey + '\uffff';
    }

    /**
     * The prefix for namespacing the Budget UID
     *
     * @type {string}
     */
    static get prefix() {
        return this.startKey;
    }

    set data(data: BudgetData) {
        this._data = data;
    }

    /**
     * Hint popup helper/tutorial configuration.
     * boxes. Setting a key of `hints{}` will trigger
     * the subscriber. Setting `hints` directly is
     * not allowed.
     *
     * Valid options:
     * * `budget.hints.outflow` (default true)
     *
     * @example
     * const budget = new Budget();
     * budget.hints.outflow // true
     * budget.hints.outflow = false;
     *
     * @type {object}
     */
    get hintsOutflow() {
        return this._data.hintsOutflow;
    }

    set hintsOutflow(outflow: boolean) {
        this._data.hintsOutflow = outflow;
        this.emitChange();
    }

    /**
     * The budget name. Will trigger subscriber upon set.
     *
     * @example
     * const budget = new Budget();
     * budget.name = 'My new budget';
     * budget.name; // === 'My new budget'
     *
     * @type {string}
     */
    get name() {
        return this._data.name;
    }

    set name(name: string) {
        this._data.name = name;
        this.emitChange();
    }

    /**
     * The currency code. Will trigger subscriber upon set.
     *
     * @example
     * const budget = new Budget();
     * budget.currency = 'CAD';
     * budget.currency; // === 'CAD'
     *
     * @type {string}
     */
    get currency() {
        return this._data.currency;
    }

    set currency(c) {
        this._data.currency = c;
        this.emitChange();
    }

    /**
     * If the check number is enabled for the all accounts screen.
     *
     * @example
     * const budget = new Budget();
     * budget.checkNumber = true;
     * budget.checkNumber; // === true
     *
     * @type {boolean}
     */
    get checkNumber() {
        return this._data.checkNumber;
    }

    set checkNumber(c) {
        this._data.checkNumber = c;
        this.emitChange();
    }

    /**
     * Get the complete `_id`, with namespace as set in the database.
     *
     * @example
     * const budget = new Budget();
     * budget._id; // === 'budget_ab735ea6-bd56-449c-8f03-6afcc91e2248'
     *
     * @type {string}
     */
    get wholeId() {
        return this._data.id;
    }

    /**
     * When the budget was created.
     * Will be stored in record as `date.toISOString()`.
     * Cannot be set.
     *
     * @example
     * const budget = new Budget();
     * budget.created; // practically `new Date()`
     *
     * @type {date}
     */
    get created() {
        return new Date(this.data.created);
    }

    /**
     * Set the revision number of the record, via PouchDB. No getter.
     *
     * @example
     * const budget = new Budget();
     * budget._rev = '1-A6157A5EA545C99B00FF904EEF05FD9F';
     *
     * @type {string}
     */
    set rev(r: any) {
        this._data.rev = r;
    }

    private static migrateToNewBudget(rawData: BudgetData | any): BudgetData {
        if ('hints' in rawData) {
            rawData.hintsOutflow = rawData.hints.outflow;
            delete rawData.hintsOutflow;
        }

        if ('_id' in rawData) {
            rawData.id = rawData._id;
            delete rawData._id;
        }

        if ('_rev' in rawData) {
            rawData.rev = rawData._rev;
            delete rawData._rev;
        }

        if ('_deleted' in rawData) {
            rawData.deleted = rawData._deleted;
            delete rawData._deleted;
        }

        return rawData
    }

    /**
     * Used for detecting if a document's _id is a Budget
     *
     * @param {string} _id - The document's _id
     * @returns {boolean} True if document _id is a Budget
     */
    static contains(_id: any) {
        return _id > this.startKey && _id < this.endKey;
    }

    remove() {
        this._data.deleted = true;
        return this.emitChange();
    }

    /**
     * Used to set the function to invoke upon record changes.
     *
     * @param {function} fn - This function will be invoked upon record
     * changes with the Budget object as the first parameter.
     */
    subscribe(fn: any) {
        this.fn = fn;
    }

    /**
     * Will call the subscribed function, if it exists, with self.
     *
     * @private
     */
    emitChange() {
        return this.fn && this.fn(this);
    }

    /**
     * Will serialize the Budget object to
     * a JSON object for sending to the database.
     *
     * @returns {object}
     */
    toJSON() {
        return this.data;
    }
}
