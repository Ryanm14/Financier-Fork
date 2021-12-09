import React from "react";

interface BudgetSelectorProps {
    id: string,
    name: string,
    time: string
}

const openBudget = (id: string) => {
    window.location.href += id + "/budget"
}

export const BudgetSelector = ({id, name, time}: BudgetSelectorProps) => {
    return <li className={"budgets__flipper"}>
        <div className={"budgets__budget"} onClick={() => openBudget(id)}>
            <div className={"budgets__budget-name"}>{name}</div>
            <div className={"budgets__budget-opened"}>
                <sub>Last opened</sub>
                <br/>
                {time}
            </div>
        </div>
    </li>
}
