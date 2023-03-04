import React from 'react'
interface ButtonProps {
  isSubmitting?: boolean
  Icon: React.ReactNode
  text: string
}
const Button = ({ isSubmitting, Icon, text }: ButtonProps) => {
  return (
    <button className="btn btn--dark" type="submit" disabled={isSubmitting}>
      {isSubmitting ? (
        <span>Submitting...</span>
      ) : (
        <>
          <span>{text}</span> {Icon}
        </>
      )}
    </button>
  )
}

export default Button
