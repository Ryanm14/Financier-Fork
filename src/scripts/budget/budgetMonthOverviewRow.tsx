import React, {useEffect, useState} from "react";
import {BudgetMonthOverview} from "./budgetMonthOverview.jsx";
import {Month} from "../backend/newMonth";
// @ts-ignore
import moment from "moment";
import {NewDB} from "../backend/newDb";
import {MonthManager} from "../backend/newMonthManager";

const getMonth = (manager: any, date: Date) => {
    manager.getMonth(date);
    const dateUntil = moment(date).add(5, 'months').toDate();
    manager.getMonth(dateUntil);

    const dateId = Month.createID(date);

    for (let i = manager.months.length - 1; i >= 0; i--) {
        if (manager.months[i].date === dateId) {
            return manager.months.slice(i, i + 5);
        }
    }
}

export const BudgetMonthOverviewRow = ($stateParams: any) => {

    const [categories, setCategories] = useState(null);
    const [manager, setManager] = useState<MonthManager>(new MonthManager(undefined, null));


    useEffect(() => {
        const budgetManager = NewDB.getInstance().budget($stateParams.$stateParams.budgetId)

        budgetManager.budget_all().then((manager: MonthManager) => {
            setManager(manager);
        });

        budgetManager.categories_all().then((categories: any) => {
            setCategories(categories);
        });
    }, []);

    if (manager && categories) {
        manager.propagateRolling(Object.keys(categories))
    }


    const lastMonth = localStorage.getItem(`lastBudgetMonth_${$stateParams.$stateParams.budgetId}`);
    let currentMonth = new Date();
    if (lastMonth) {
        currentMonth = new Date(lastMonth);
    }

    if (manager == undefined) {
        return <div>Null</div>
    }

    const months = getMonth(manager, currentMonth);
    const month = months[0];

    const isOld = false;
    const isLast = false;
    const isCurrent = true;

    const totalAvailableLastMonthValue = month.cache.totalAvailableLastMonth;
    const totalBudgetForThisMonth = month.cache.totalBudget;
    const totalIncomeThisMonth = month.cache.totalIncome;
    const totalOverspentLastMonth = month.cache.totalOverspentLastMonth;

    return <div>

        <div className="budget__tr month-overview__row">
            <div className="budget__th budget__category-label" resize-categories ng-style="styles"/>
            <BudgetMonthOverview
                monthText={"January 2021"}
                isCurrent={isCurrent}
                isLast={isLast}
                isOld={isOld}
                totalAvailableLastMonthValue={totalAvailableLastMonthValue}
                totalBudgetForThisMonth={totalBudgetForThisMonth}
                totalIncomeThisMonth={totalIncomeThisMonth}
                totalOverspentLastMonth={totalOverspentLastMonth}/>

        </div>

        <div className={"budget__tr month-overview__row"} disable-ng-animate>
            <div
                className="budget__th budget__month-row budget__category-label budget__category-label&#45;&#45;expanded"
                resize-categories ng-style="styles">
                <div className="budget__categories-label">
                    Categories
                    {/*<div className="budget__add-master-category" add-category="budgetCtrl.addMasterCategory(name)"*/}
                    {/*     add-label="{{'ADD_MASTER_CATEGORY' | translate}}"></div>*/}
                </div>
            </div>
            <div className={"budget__th budget__month-row month-overview__cell-head"}>Budgeted
                <div>$14.00</div>
            </div>
            <div className="budget__th budget__month-row month-overview__cell-head">Outflows
                <div>$20.00</div>
            </div>
            <div className={`budget__th budget__month-row month-overview__cell-head`}>
                {/*ng-class="{'budget__month-end': !$last}"*/}
                Balance
                <div>$96.00</div>
            </div>
        </div>

    </div>
}




