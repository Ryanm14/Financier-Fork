import React from "react";

interface BudgetMonthOverview {
    monthText: string,
    isLast: boolean,
    isOld: boolean,
    isCurrent: boolean,
    totalAvailableLastMonthValue: number,
    totalOverspentLastMonth: number,
    totalIncomeThisMonth: number,
    totalBudgetForThisMonth: number
}

// colspan="3"
// ng-repeat="month in dbCtrl.months | limitTo : budgetCtrl.showMonths track by $index"
// ng-class="{
//          '': !$last,
//          'month-overview__month-overview--old': month.date < budgetCtrl.currentMonth,
//          'month-overview__month-overview--current': month.date === budgetCtrl.currentMonth
//        }">

//<div className="month-overview__month-text">{{month.date | date: 'MMMM yyyy'}}</div>

export const BudgetMonthOverview = ({
                                        monthText,
                                        isLast,
                                        isOld,
                                        isCurrent,
                                        totalAvailableLastMonthValue,
                                        totalOverspentLastMonth,
                                        totalIncomeThisMonth,
                                        totalBudgetForThisMonth
                                    }: BudgetMonthOverview) => {
    const isLastClass = isLast ? 'budget__month-end' : ''
    const isOldClass = isOld ? 'month-overview__month-overview--old' : ''
    const isCurrentClass = isCurrent ? 'month-overview__month-overview--current' : ''

    return <div className={`budget__th month-overview__month-overview ${isLastClass} ${isOldClass} ${isCurrentClass}`}>
        <div className="month-overview__month-text"> {monthText} </div>
        <div>
            <dl className="month-overview__month-list">
                <dt>${totalAvailableLastMonthValue}</dt>
                <dd>
                    {totalAvailableLastMonthValue >= 0 ?
                        <span> Not Budgeted in Nov </span> : <></>
                    }

                    {totalAvailableLastMonthValue < 0 ?
                        <span> Overbudgeted in Nov</span> : <></>
                    }
                </dd>

                <dt>-${totalOverspentLastMonth}</dt>
                <dd>
                    Overspent in Nov
                </dd>

                <dt>
                    {/* TODO add link */}
                    <span className={"budget__outflow-link"}>
                        {totalIncomeThisMonth >= 0 ? <span>+</span> : <></>}
                        ${totalIncomeThisMonth}
                </span>
                </dt>
                <dd>
                    Income for Dec
                </dd>

                <dt> -${totalBudgetForThisMonth}</dt>
                <dd>
                    Budgeted In Dec
                </dd>
            </dl>

        </div>
    </div>
}

// <div collapse="dbCtrl.collapsed.monthOverview">
//     <dl className="month-overview__month-list">
//         <dt>{{
//             month
//             .cache.totalAvailableLastMonth | intCurrency : true : dbCtrl.currencyDigits | currency : '' : dbCtrl.currencyDigits}}</dt>
//         <dd>
//                 <span ng-if="month.cache.totalAvailableLastMonth >= 0">
//                   {{'NOT_BUDGETED_IN' | translate : budgetCtrl.translationPayloads.lastMonth(month.date)}}
//                 </span>
//             <span ng-if="month.cache.totalAvailableLastMonth < 0">
//                   {{'OVERBUDGETED_IN' | translate : budgetCtrl.translationPayloads.lastMonth(month.date)}}
//                 </span>
//         </dd>
//
//         <dt>-{{
//             month
//             .cache.totalOverspentLastMonth | intCurrency : true : dbCtrl.currencyDigits | currency : '' : dbCtrl.currencyDigits}}</dt>
//         <dd>
//             {{'OVERSPENT_IN' | translate : budgetCtrl.translationPayloads.lastMonth(month.date)}}
//         </dd>
//
//         <dt>
//                 <span className="budget__outflow-link" outflow-tip category="income"
//                       position="{{$last ? 'bottom right' : 'bottom center'}}">
//                   <span ng-if="month.cache.totalIncome >= 0">+</span>{{
//                     month
//                     .cache.totalIncome | intCurrency : true : dbCtrl.currencyDigits | currency : '' : dbCtrl.currencyDigits}}
//                 </span>
//         </dt>
//         <dd>
//             {{'INCOME_FOR' | translate : budgetCtrl.translationPayloads.currentMonth(month.date)}}
//         </dd>
//
//         <dt>{{ - month.cache.totalBudget | intCurrency : true : dbCtrl.currencyDigits | currency : '' : dbCtrl.currencyDigits}}</dt>
//         <dd>
//             {{'BUDGETED_IN' | translate : budgetCtrl.translationPayloads.currentMonth(month.date)}}
//         </dd>
//     </dl>
//
// </div>
//
// <div ng-click="dbCtrl.collapsed.monthOverview = !dbCtrl.collapsed.monthOverview"
//      className="month-overview__month-total" ng-class="
//             {
//               'month-overview__month-total--negative': month.cache.totalAvailable < 0
//             }"><span ng-if="!dbCtrl.collapsed.monthOverview">= </span>{{
//     month
//     .cache.totalAvailable | intCurrency : true : dbCtrl.currencyDigits | currency : dbCtrl.currencySymbol : dbCtrl.currencyDigits}}
// </div>
// <div className="month-overview__month-total-subtext">
//     <span ng-if="month.cache.totalAvailable >= 0">{{'AVAILABLE_TO_BUDGET' | translate}}</span>
//     <span ng-if="month.cache.totalAvailable < 0">{{'OVERBUDGETED' | translate}}</span>
// </div>
