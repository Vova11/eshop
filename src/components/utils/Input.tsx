import React, { type FC, forwardRef } from 'react'

type InputProps = {
  label: string
  id: string
} & React.ComponentPropsWithoutRef<'input'>

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, ...props }, ref) => {
    return (
      <p>
        <label htmlFor={id}>{label}</label>
        <input id={id} name={id} {...props} ref={ref} />
      </p>
    )
  }
)

export default Input
