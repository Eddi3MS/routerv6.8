import {
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  useLoaderData,
  useSearchParams,
  redirect,
} from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  AddBudgetForm,
  AddExpenseForm,
  BudgetItem,
  Intro,
  Table,
} from '../components'
import { createBudget, createExpense, fetchData } from '../helpers'
import {
  BudgetProps,
  DashboardFormDataVariations,
  ExpenseProps,
  LoaderData,
} from '../types'

export const dashboardLoader = async function ({ request }) {
  const userName: string = fetchData('userName')
  const budgets: BudgetProps[] = fetchData('budgets')
  const expenses: ExpenseProps[] = fetchData('expenses')

  return { userName, budgets, expenses }
} satisfies LoaderFunction

export async function dashboardAction({ request }: ActionFunctionArgs) {
  const data = await request.formData()
  const formData = Object.fromEntries(data) as DashboardFormDataVariations

  if ('_user_action' in formData) {
    try {
      localStorage.setItem('userName', JSON.stringify(formData.userName))

      return toast.success(`Welcome, ${formData.userName}`)
    } catch (error) {
      throw new Error('There was a problem creating your account.')
    }
  }

  if ('_budget_action' in formData) {
    try {
      createBudget({
        amount: formData.newBudgetAmount,
        name: formData.newBudget,
      })
      return toast.success('Budget created!')
    } catch (error) {
      throw new Error('There was a problem creating your budget.')
    }
  }

  if ('_expense_action' in formData) {
    try {
      createExpense({
        amount: formData.newExpenseAmount,
        name: formData.newExpense,
        budgetId: formData.newExpenseBudget,
      })
      return toast.success('Expense created!')
    } catch (error) {
      throw new Error('There was a problem creating your expense.')
    }
  }
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData() as LoaderData<
    typeof dashboardLoader
  >

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>.
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((bud) => (
                    <BudgetItem key={bud.id} budget={bud} />
                  ))}
                </div>
                {expenses && expenses.length && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>
                    <Table
                      expenses={expenses.sort(
                        (a, b) => b.createdAt - a.createdAt
                      )}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  )
}

export default Dashboard
