import React, {useEffect, useState} from 'react';
import {timeDifference} from "./relativeTime";
import {BudgetSelector} from "./budgetSelector.jsx";
import {NewDB} from "../backend/newDb";

function orderBudgets(budgets: Budget[], budgetsOrder: any) {
    const orderedBudgets: BudgetDetails[] = []

    const idToNameMap = new Map<string, string>();
    budgets.forEach((budget) => {
        idToNameMap.set(budget.id, budget._data.name)
    })


    Object.keys(budgetsOrder).forEach((id) => {
        orderedBudgets.push({id: id, name: idToNameMap.get(id)!, lastOpened: budgetsOrder[id]._data.opened})
    })
    return orderedBudgets;
}

export const BudgetSelectorList = () => {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [budgetsOrder, setBudgetsOrder] = useState<any>({});

    useEffect(() => {
        const db = NewDB.getInstance();
        // @ts-ignore
        const oldDb = window.$injector.get('db');
        db.all().then((b: any) => {
            setBudgets(b);
        })


        db.allBudgetsOpened().then((order: any) => {
            setBudgetsOrder(order);
        })
    }, []);

    const orderedBudgets = orderBudgets(budgets, budgetsOrder);

    return orderedBudgets.map(({id, name, lastOpened}) => {
            return <BudgetSelector
                key={id}
                id={id}
                name={name}
                time={timeDifference(lastOpened)}
            />
        }
    );
}


