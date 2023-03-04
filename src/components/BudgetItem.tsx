import React, { CSSProperties } from 'react'
import {
  calculateSpentBudget,
  formatCurrency,
  formatPercentage,
} from '../helpers'
import { BudgetProps } from '../types'

const BudgetItem = ({ budget }: { budget: BudgetProps }) => {
  const { amount, color, id, name } = budget
  const spent = calculateSpentBudget(id)
  const style = { '--accent': color } as CSSProperties

  return (
    <div style={style} className="budget">
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)}</small>
        <small>{formatCurrency(amount - spent)}</small>
      </div>
    </div>
  )
}

export default BudgetItem
