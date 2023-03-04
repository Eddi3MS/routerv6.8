import { LoaderFunction } from 'react-router-dom'

export type ExpenseProps = {
  id: string
  name: string
  createdAt: number
  amount: number
  budgetId: string
}

export type BudgetProps = {
  id: string
  name: string
  createdAt: number
  amount: number
  color: string
}

export type LoaderData<TLoaderFn extends LoaderFunction> = Awaited<
  ReturnType<TLoaderFn>
> extends Response | infer D
  ? D
  : never

export type LocalStorageKey = 'userName' | 'budgets' | 'expenses'

export type DashboardFormDataVariations =
  | { _user_action: 'newUser'; userName: string }
  | {
      _budget_action: 'createBudget'
      newBudgetAmount: string
      newBudget: string
    }
  | {
      _expense_action: 'createExpense'
      newExpenseAmount: string
      newExpense: string
      newExpenseBudget: string
    }
