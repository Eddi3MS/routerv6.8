import { CurrencyDollarIcon } from '@heroicons/react/24/solid'
import { useFetcher } from 'react-router-dom'
import useFormSubmitting from '../hooks/useSubmitForm'
import Button from './Button'
import Input from './Input'

const AddBudgetForm = () => {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === 'submitting'

  const { focusRef, formRef } = useFormSubmitting(isSubmitting)

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create budget</h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <Input
          label="Budget Name"
          type="text"
          name="newBudget"
          ref={focusRef}
          placeholder="e.g., Groceries"
          required
        />

        <input type="hidden" name="_budget_action" value="createBudget" />

        <Input
          label="Budget Amount"
          type="number"
          step="0.01"
          name="newBudgetAmount"
          placeholder="e.g., $250"
          required
          inputMode="decimal"
        />

        <Button
          text="Create budget"
          Icon={<CurrencyDollarIcon width={20} />}
          isSubmitting={isSubmitting}
        />
      </fetcher.Form>
    </div>
  )
}

export default AddBudgetForm
