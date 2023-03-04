import React, { forwardRef, InputHTMLAttributes, LegacyRef } from 'react'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}
const Input = (
  { label, name, ...rest }: InputProps,
  ref: LegacyRef<HTMLInputElement>
) => {
  return (
    <div className="grid-xs">
      <label htmlFor={name}>{label}</label>
      <input type="text" name={name} id={name} {...rest} required ref={ref} />
    </div>
  )
}

export default forwardRef(Input)
