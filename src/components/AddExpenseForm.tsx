import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { useFetcher } from 'react-router-dom'
import { BudgetProps } from '../helpers'
import useFormSubmitting from '../hooks/useSubmitForm'
import Button from './Button'
import Input from './Input'

interface AddExpenseFormProps {
  budgets: BudgetProps[]
}

const AddExpenseForm = ({ budgets }: AddExpenseFormProps) => {
  const fetcher = useFetcher()

  const isSubmitting = fetcher.state === 'submitting'

  const { focusRef, formRef } = useFormSubmitting(isSubmitting)

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add New{' '}
        <span className="accent">
          {budgets.length === 1 && `${budgets.map((bud) => bud.name)}`}
        </span>{' '}
        Expense
      </h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="expense-inputs">
          <Input
            label="Expense Name"
            type="text"
            name="newExpense"
            ref={focusRef}
            placeholder="e.g., Coffee"
            required
          />

          <Input
            label="Expense Amount"
            type="number"
            step="0.01"
            inputMode="decimal"
            name="newExpenseAmount"
            placeholder="e.g., $2.35"
            required
          />

          <div className="grid-xs" hidden={budgets.length === 1}>
            <label htmlFor="newExpenseBudget">Budget Category</label>
            <select name="newExpenseBudget" id="newExpenseBudget" required>
              {budgets
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((budget) => (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                ))}
            </select>
          </div>

          <input type="hidden" name="_expense_action" value="createExpense" />
        </div>

        <Button
          text="Add Expense"
          Icon={<PlusCircleIcon width={20} />}
          isSubmitting={isSubmitting}
        />
      </fetcher.Form>
    </div>
  )
}

export default AddExpenseForm
