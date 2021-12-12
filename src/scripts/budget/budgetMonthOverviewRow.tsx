import React from "react";
import {BudgetMonthOverview} from "./budgetMonthOverview.jsx";

export const BudgetMonthOverviewRow = () => {


    return <div>

        <div className="budget__tr month-overview__row">
            <div className="budget__th budget__category-label" resize-categories ng-style="styles"/>
            <BudgetMonthOverview
                monthText={"January 2021"}
                isCurrent={false}
                isLast={false}
                isOld={false}
                totalAvailableLastMonthValue={20.00}
                totalBudgetForThisMonth={19.00} totalIncomeThisMonth={18} totalOverspentLastMonth={17}/>
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




