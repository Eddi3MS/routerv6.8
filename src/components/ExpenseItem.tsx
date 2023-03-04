import { formatCurrency, formatDate } from '../helpers'
import { ExpenseProps } from '../types'

const ExpenseItem = ({ expense }: { expense: ExpenseProps }) => {
  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDate(expense.createdAt)}</td>
    </>
  )
}

export default ExpenseItem
