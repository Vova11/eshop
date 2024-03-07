import React, { FC } from 'react'
import { ComponentPropsWithoutRef } from 'react'

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  href?: never
}

type AnchorProps = ComponentPropsWithoutRef<'a'> & {
  href?: string
}

const isAnchorProps = (props: ButtonProps | AnchorProps): props is AnchorProps => {
  return 'href' in props
}

const Button: FC<ButtonProps | AnchorProps> = (props) => {
  if (isAnchorProps(props)) {
    return <a className='button' {...props}></a>
  }

  return <button {...props}></button>
}

export default Button
