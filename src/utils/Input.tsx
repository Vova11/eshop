import React, { type FC, forwardRef } from 'react'

type InputProps = {
  label: string
  id: string
  name: string
} & React.ComponentPropsWithoutRef<'input'>

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, name, ...props }, ref) => {
    return (
      <>
        <label htmlFor={id} className='label'>
          <span className='label-text capitalize'>{label}</span>
        </label>
        
        <input
          id={id}
          name={name}
          {...props}
          ref={ref}
          className='input input-bordered'
        />
      
      </>
    )
  }
)

export default Input
