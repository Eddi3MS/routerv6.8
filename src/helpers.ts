import { ExpenseProps, LocalStorageKey } from './types'

export const fetchData = (key: LocalStorageKey) => {
  const data = localStorage.getItem(key)
  if (data != null) {
    return JSON.parse(data)
  }

  return ''
}

const generateRandomColor = () => {
  const existingBudgetsLength = fetchData('budgets')?.length ?? 0
  return `${existingBudgetsLength * 34} 65% 50%`
}

export const deleteItem = ({ key }: { key: LocalStorageKey }) => {
  return localStorage.removeItem(key)
}

export const createBudget = ({
  name,
  amount,
}: {
  name: string
  amount: string
}) => {
  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  }

  const existingBudgets = fetchData('budgets') || []

  const updatedBudgets = [...existingBudgets, newItem]

  return localStorage.setItem('budgets', JSON.stringify(updatedBudgets))
}

export const createExpense = ({
  name,
  amount,
  budgetId,
}: {
  name: string
  amount: string
  budgetId: string
}) => {
  const newItem: ExpenseProps = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  }

  const existingExpenses: ExpenseProps[] = fetchData('expenses') || []

  const updatedExpenses = [...existingExpenses, newItem]

  return localStorage.setItem('expenses', JSON.stringify(updatedExpenses))
}

export function formatCurrency(amt: number) {
  return amt.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
  })
}

export function calculateSpentBudget(budgetId: string) {
  const expenses: ExpenseProps[] = fetchData('expenses') || []

  const budgetSpent = expenses.reduce((acc: number, expense: ExpenseProps) => {
    if (expense.budgetId !== budgetId) return acc

    return (acc += expense.amount)
  }, 0)

  return budgetSpent
}

export function formatPercentage(amt: number) {
  return amt.toLocaleString(undefined, {
    style: 'percent',
    minimumFractionDigits: 0,
  })
}

export function formatDate(epoch: number) {
  return new Date(epoch).toLocaleDateString()
}
