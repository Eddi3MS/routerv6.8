import { useEffect, useRef } from 'react'

const useFormSubmitting = (isSubmitting: boolean) => {
  const formRef = useRef<HTMLFormElement>(null)
  const focusRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current?.reset()
      focusRef.current?.focus()
    }
  }, [isSubmitting])

  return { formRef, focusRef }
}

export default useFormSubmitting
